
## Views
# views.py
import openrouteservice
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate,get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer, ActivitySerializer
from .models import WorkoutBuddyProfile, FitnessGroup
from .serializers import WorkoutBuddyProfileSerializer, FitnessGroupSerializer
from .models import Activity, GroupMembership, Notification, GroupChat
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import CustomUser
User = get_user_model()
client = openrouteservice.Client(key=settings.OPENROUTESERVICE_API_KEY)

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the current user's location
        user = request.user
        user_location = getattr(user, "location", None)  # Assume 'location' is a string 'lat,lng'

        if not user_location:
            return Response({"detail": "User location is missing."}, status=400)

        user_coordinates = list(map(float, user_location.split(',')))  # Convert to [lat, lng]

        # Find potential workout buddies
        buddies = CustomUser.objects.exclude(id=user.id)  # Exclude the current user
        workout_buddies = []

        for buddy in buddies:
            if buddy.location:
                buddy_coordinates = list(map(float, buddy.location.split(',')))

                # Use OpenRouteService for distance calculation
                try:
                    routes = client.directions(
                        coordinates=[user_coordinates, buddy_coordinates],
                        profile="driving-car",
                        format="geojson",
                    )
                    # Extract distance from the response
                    distance = routes["features"][0]["properties"]["segments"][0]["distance"] / 1000  # Distance in km

                    # Add buddy to the list if within proximity (e.g., 50km)
                    if distance <= 50:
                        workout_buddies.append(buddy)
                except openrouteservice.exceptions.ApiError:
                    continue

        # Get available fitness groups
        groups = FitnessGroup.objects.all()

        group_data = []
        for group in groups:
            members = group.members.all()
            group_data.append({
                'group': FitnessGroupSerializer(group).data,
                'members': [member.username for member in members],
            })

        return Response({
            'workout_buddies': WorkoutBuddyProfileSerializer(workout_buddies, many=True).data,
            'fitness_groups': FitnessGroupSerializer(groups, many=True).data,
        })

# Group Organizer Dashboard View
class GroupOrganizerDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Group Organizer Perspective:
        user = request.user
        groups = FitnessGroup.objects.filter(created_by=user)

        group_data = []
        for group in groups:
            # Assuming there is a method to get requests for a group (join requests)
            join_requests = group.join_requests.all()  # Assuming `join_requests` is related to the group
            group_data.append({
                'group': FitnessGroupSerializer(group).data,
                'join_requests': join_requests
            })
        
        return Response(group_data)

def api_root(request):
    """
    Root endpoint for the API.
    """
    return JsonResponse({
        "message": "Welcome to the Fitnight API!",
        "endpoints": {
            "Register": "/api/auth/register/",
            "Login": "/api/auth/login/",
            "Token Refresh": "/api/auth/token/refresh/",
            "Admin Panel": "/admin/",
        }
    })


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = True
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            if not user.is_active:
                return Response({"detail": "Account is not active."}, status=status.HTTP_403_FORBIDDEN)

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username,
                'role': user.role,
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

class ActivityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        activities = Activity.objects.filter(user=request.user)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ActivitySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkoutBuddyProfileView(APIView):
    def post(self, request):
        serializer = WorkoutBuddyProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate with the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FitnessGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['created_by'] = request.user.id
        
        serializer = FitnessGroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"detail": "Failed to create group", "errors": serializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
        )

class GroupInteractionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, group_id):
        user = request.user
        group = get_object_or_404(FitnessGroup, id=group_id)

        # Create join request
        if group.members.filter(id=user.id).exists():
            return Response({"detail": "You are already a member of this group."}, status=status.HTTP_400_BAD_REQUEST)

        membership = GroupMembership.objects.create(user=user, group=group, status='pending')

        # Send a notification to the group organizer
        notification_message = f"{user.username} has requested to join your group: {group.name}"
        Notification.objects.create(user=group.created_by, message=notification_message)

        return Response({
            "message": "Join request sent.",
            "join_request_status": membership.status,
        }, status=status.HTTP_201_CREATED)


from .serializers import GroupChatSerializer

class SendGroupMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, group_id):
        group = get_object_or_404(FitnessGroup, id=group_id)
        user = request.user

        # Validate the user's membership or role in the group (optional)
        if not group.members.filter(id=user.id).exists():
            return Response({"detail": "You are not a member of this group."}, status=status.HTTP_403_FORBIDDEN)

        # Create a new message
        message = request.data.get("message")
        if not message:
            return Response({"detail": "Message content is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        group_message = GroupChat.objects.create(group=group, user=user, message=message)

        # Optionally, notify other group members about the new message
        # You can implement a notification system here (as described earlier)
        
        return Response(GroupChatSerializer(group_message).data, status=status.HTTP_201_CREATED)

    def debug_view(request):
       if request.method == 'POST':
        print(request.POST)
        return JsonResponse({"message": "Data received", "data": request.POST})
       return JsonResponse({"message": "Only POST requests are accepted."})