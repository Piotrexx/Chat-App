from django.contrib.auth.models import User 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from .serializers import UserSerializer, ChatRoomSerializer, MessageSerializer, UserProfileSerielizer, FriendRequestSerielizer
from django.contrib.auth.models import User
from .models import ChatRoom, Message, UserProfile, FriendRequest
from rest_framework.response import Response

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        
        token['username'] = user.username


        return token
class MyTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserSerializerView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ChatRoomSerializerView(viewsets.ModelViewSet):
    serializer_class = ChatRoomSerializer
    queryset = ChatRoom.objects.all()

class MessageSerielizerView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    def get_queryset(self):
        queryset = Message.objects.all()
        foreign_key_id = self.kwargs.get('foreign_key_id')
        if foreign_key_id:
            queryset = queryset.filter(chatroom_id=foreign_key_id)
        return queryset    
    
class UserProfileSerielizerView(viewsets.ModelViewSet):
    serializer_class = UserProfileSerielizer
    
    def get_queryset(self):
        queryset = UserProfile.objects.all()
        foreign_key_id = self.kwargs.get('foreign_key_id')
        if foreign_key_id:
            queryset = queryset.filter(user=foreign_key_id)
        else:
            queryset = FriendRequest.objects.all()
        return queryset


class FriendRequestSerielizerView(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerielizer
    
    def get_queryset(self):
        queryset = FriendRequest.objects.all()
        foreign_key_id = self.kwargs.get('foreign_key_id')
        if foreign_key_id:
            queryset = queryset.filter(receiver_id=foreign_key_id)
        else:
            queryset = FriendRequest.objects.all()
        return queryset

    
    
class postingRequests(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerielizer
    queryset = FriendRequest.objects.all()

class postingMessages(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    
class postingUserProfile(viewsets.ModelViewSet):
    serializer_class = UserProfileSerielizer
    queryset = UserProfile.objects.all()