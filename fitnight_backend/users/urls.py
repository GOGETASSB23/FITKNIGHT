
## URLs
# urls.py
from django.urls import path
from .views import (
    RegisterView, 
    CustomLoginView, 
    ActivityView, 
    WorkoutBuddyProfileView, 
    FitnessGroupView, 
    DashboardView, 
    GroupOrganizerDashboardView, 
    GroupInteractionView, 
    SendGroupMessageView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='custom_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('activities/', ActivityView.as_view(), name='activities'),
    path('workout_buddy_profile/', WorkoutBuddyProfileView.as_view(), name='workout_buddy_profile'),
    path('fitness-group/', FitnessGroupView.as_view(), name='fitness_group'),

    # Dashboard URLs
    path('buddy_dashboard/', DashboardView.as_view(), name='dashboard'),  # For Buddy Finder
    path('group-organizer-dashboard/', GroupOrganizerDashboardView.as_view(), name='group_organizer_dashboard'),  # For Group Organizer
    
    # Group Interaction & Group Chat
    path('group/<int:group_id>/interact/', GroupInteractionView.as_view(), name='group_interact'),  # Join a group
    path('group/<int:group_id>/send-message/', SendGroupMessageView.as_view(), name='send_group_message'),  # Send message to group
]

