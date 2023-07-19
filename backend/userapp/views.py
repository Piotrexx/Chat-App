from django.contrib.auth.models import User 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from .serializers import UserSerializer, ChatRoomSerializer, MessageSerializer, UserProfileSerielizer, FriendRequestSerielizer
from django.contrib.auth.models import User
from .models import ChatRoom, Message, UserProfile, FriendRequest
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
    queryset = Message.objects.all()

class UserProfileSerielizerView(viewsets.ModelViewSet):
    serializer_class = UserProfileSerielizer
    queryset = UserProfile.objects.all()

class FriendRequestSerielizerView(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerielizer
    queryset = FriendRequest.objects.all()
