from django.core.paginator import Paginator, EmptyPage
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)


class RegisterUser(APIView):
    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def getUserData(request):
    user = request.user
    user = UserSerializer(user)

    return Response(user.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUsers(request):
    users = UserAccount.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manageTasks(request, pk=None):
    user = request.user

    if request.method == 'GET':
        page_size = request.GET.get('page_size', 10)
        page = request.GET.get('page', 1)
        tasks = user.task_set.all().order_by('-created_at')

        paginator = Paginator(tasks, page_size)

        try:
            tasks = paginator.page(page)
        except EmptyPage:
            return Response({'error': 'Page Empty'}, status=404)

        serializer = TaskSerializer(tasks, many=True)
        response_data = {'results': serializer.data, 'count': paginator.count}
        return Response(response_data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        task = get_object_or_404(Task, pk=pk)

        if user != task.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manageSkills(request, pk=None):
    user = request.user

    if request.method == 'GET':
        page_size = request.GET.get('page_size', 10)
        page = request.GET.get('page', 1)
        skills = user.skill_set.all().order_by('-created_at')

        paginator = Paginator(skills, page_size)

        try:
            skills = paginator.page(page)
        except EmptyPage:
            return Response({'error': 'Page Empty'}, status=404)

        serializer = SkillSerializer(skills, many=True)
        response_data = {'results': serializer.data, 'count': paginator.count}
        return Response(response_data)

    elif request.method == 'POST':
        serializer = SkillSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        skill = get_object_or_404(Skill, pk=pk)

        if user != skill.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        serializer = SkillSerializer(skill, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        skill = get_object_or_404(Skill, pk=pk)
        skill.delete()
        return Response({'message': 'Skill deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manageChallenges(request, pk=None):
    user = request.user

    if request.method == 'GET':
        page_size = request.GET.get('page_size', 10)
        page = request.GET.get('page', 1)
        challenges = user.challenge_set.all().order_by('-created_at')

        paginator = Paginator(challenges, page_size)

        try:
            challenges = paginator.page(page)
        except EmptyPage:
            return Response({'error': 'Page Empty'}, status=404)

        serializer = ChallengeSerializer(challenges, many=True)
        response_data = {'results': serializer.data, 'count': paginator.count}
        return Response(response_data)

    elif request.method == 'POST':
        serializer = ChallengeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        challenge = get_object_or_404(Challenge, pk=pk)

        if user != challenge.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        serializer = ChallengeSerializer(challenge, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        challenge = get_object_or_404(Challenge, pk=pk)
        challenge.delete()
        return Response({'message': 'Challenge deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manageCategories(request, pk=None):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
