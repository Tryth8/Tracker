from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenVerifyView, )

from . import views

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('categories/', views.manageCategories, name=''),
    path('create_category/', views.manageCategories, name=''),

    path('users/', views.getUsers, name=''),
    path('create_user/', views.RegisterUser.as_view(), name=''),
    path('get_user_info/', views.getUserData, name=''),

    path('tasks/', views.manageTasks, name=''),
    path('create_task/', views.manageTasks, name=''),
    path('tasks/<int:pk>/', views.manageTasks, name=''),
    path('tasks/<int:pk>/delete/', views.manageTasks, name=''),

    path('skills/', views.manageSkills, name=''),
    path('create_skill/', views.manageSkills, name=''),
    path('skills/<int:pk>/', views.manageSkills, name=''),
    path('skills/<int:pk>/delete/', views.manageSkills, name=''),

    path('challenges/', views.manageChallenges, name=''),
    path('create_challenge/', views.manageChallenges, name=''),
    path('challenges/<int:pk>/', views.manageChallenges, name=''),
    path('challenges/<int:pk>/delete/', views.manageChallenges, name=''),
]
