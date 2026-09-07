from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    assigned_to_username = serializers.ReadOnlyField(
        source='assigned_to.username'
    )

    project_name = serializers.ReadOnlyField(
        source='project.name'
    )

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'project',
            'project_name',
            'assigned_to',
            'assigned_to_username',
            'priority',
            'status',
            'due_date',
            'created_at',
            'updated_at',
        ]