
    
    ## Serializers
# serializers.py
from rest_framework import serializers
from .models import CustomUser, Activity,WorkoutBuddyProfile,FitnessGroup
from .models import Notification,GroupChat,GroupMembership

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username',  'password', 'profile_picture', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
           
            password=validated_data['password'],
            profile_picture=validated_data.get('profile_picture'),
            role=validated_data.get('role')
        )
        return user

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'description', 'duration_minutes', 'date', 'user']



class WorkoutBuddyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutBuddyProfile
        fields = ['user', 'workout_preferences', 'availability','preferred_location']

class FitnessGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FitnessGroup
        fields = ['id', 'name', 'activity_type', 'location', 'schedule', 'description']

# serializers.py



class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['notification_type', 'message', 'timestamp', 'is_read']


class GroupMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMembership
        fields = ['user', 'group', 'status', 'join_date']


class GroupChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupChat
        fields = ['user', 'message', 'timestamp']
