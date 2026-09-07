from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet, dashboard_stats


router = DefaultRouter()

router.register(
    'projects',
    ProjectViewSet,
    basename='project'
)

urlpatterns = [
    path(
        'dashboard/',
        dashboard_stats,
        name='dashboard'
    ),
]

urlpatterns += router.urls