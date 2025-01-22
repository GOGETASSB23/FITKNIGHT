## Backend for Fitnight Application

## Models
# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model

class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    role = models.CharField(max_length=50, blank=True, null=True)  # E.g., User, Admin
    dashboard_preferences = models.JSONField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)  # Store as 'latitude,longitude'
    def __str__(self):
        return self.username


class Activity(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='activities')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    duration_minutes = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"


class WorkoutBuddyProfile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    #fitness_goals = models.ManyToManyField('FitnessGoal', blank=True)
    workout_preferences = models.JSONField(null=True, blank=True)  # JSONField for structured data
    availability = models.JSONField(null=True, blank=True)  # JSONField for structured data
    experience_level = models.CharField(max_length=50, null=True, blank=True)
    preferred_location = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    




# models.py

class FitnessGroup(models.Model):
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="created_groups")
    name = models.CharField(max_length=255)
    activity_type = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    schedule = models.TextField()
    #description = models.TextField(null=True)  # Added description for the group
    members = models.ManyToManyField(CustomUser, related_name="fitness_groups", through='GroupMembership')
    # Other fields ...

    def __str__(self):
        return self.name


class GroupMembership(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    group = models.ForeignKey(FitnessGroup, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('joined', 'Joined')])

    def __str__(self):
        return f"{self.user.username} - {self.group.name} ({self.status})"                      


class GroupChat(models.Model):
    group = models.ForeignKey(FitnessGroup, on_delete=models.CASCADE, related_name="chats")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.user.username} in {self.group.name}"


class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username}"

