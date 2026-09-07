from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Project
        fields = [
            'id',
            'name',
            'description',
            'status',
            'deadline',
            'owner',
            'members',
            'created_at',
            'updated_at',
        ]