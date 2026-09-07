from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Project
from .serializers import ProjectSerializer
from tasks.models import Task

class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(
            members=self.request.user
        ) | Project.objects.filter(
            owner=self.request.user
        )

    def perform_create(self, serializer):
        project = serializer.save(owner=self.request.user)
        project.members.add(self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):

    projects = Project.objects.filter(
        members=request.user
    ).distinct()

    tasks = Task.objects.filter(
        project__members=request.user
    ).distinct()

    total_projects = projects.count()
    total_tasks = tasks.count()

    completed_tasks = tasks.filter(
        status='COMPLETED'
    ).count()

    in_progress_tasks = tasks.filter(
        status='IN_PROGRESS'
    ).count()

    pending_tasks = tasks.filter(
        status='TODO'
    ).count()

    if total_tasks > 0:
        completion_percentage = round(
            (completed_tasks / total_tasks) * 100
        )
    else:
        completion_percentage = 0

    return Response({
        'total_projects': total_projects,
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks,
        'in_progress_tasks': in_progress_tasks,
        'pending_tasks': pending_tasks,
        'completion_percentage': completion_percentage,
    })        