from rest_framework.permissions import BasePermission

class IsBuddy(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'buddy'

class IsOrganizer(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'organizer'
