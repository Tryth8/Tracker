from datetime import datetime

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers

from ..models import *

User = get_user_model()


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'due_date', 'category', 'completed')
        extra_kwargs = {
            'completed': {'required': False},
            'description': {'required': False},
            'due_date': {'required': False},
            'id': {'required': False},
            'category': {'required': False},
        }

    def to_internal_value(self, data):
        category_name = data.pop('category', None)
        validated_data = super().to_internal_value(data)

        if category_name:
            category, created = Category.objects.get_or_create(name=category_name)
            validated_data['category'] = category

        return validated_data

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user

        return super().create(validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category'] = instance.category.name if instance.category else None
        return representation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('username', 'email')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = 'name'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('learning_time', 'title', 'levels', 'id')
        extra_kwargs = {
            'learning_time': {'required': False},
        }

    def create(self, validated_data):
        user = self.context['request'].user

        validated_data['user'] = user
        return super().create(validated_data)


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ('title', 'description', 'days', 'amount', 'id')

    def create(self, validated_data):
        user = self.context['request'].user

        validated_data['user'] = user
        return super().create(validated_data)


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate(self, data):
        user = User(**data)
        password = data['password']

        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializer_errors['non_field_errors']}
            )
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user
