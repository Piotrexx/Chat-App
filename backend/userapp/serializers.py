from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import ChatRoom, Message, UserProfile, FriendRequest
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'id')
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = '__all__'

    # def create(self, validated_data):
    #     if validated_data['private'] and validated_data['friends_added'] == []:
    #         return Response({'message': 'loldiawpjhdaw'}, status=400)
    #     print(validated_data)
    #     return super().create(validated_data)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('content', 'author', 'chatroom' )

class UserProfileSerielizer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class FriendRequestSerielizer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'