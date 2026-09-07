from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import MemberSerializer


class MemberListView(generics.ListAPIView):

    queryset = User.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]