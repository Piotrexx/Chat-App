"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from userapp import views

router = routers.DefaultRouter()

router.register(r'user', views.UserSerializerView, 'user')
router.register(r'chatroomform', views.ChatRoomSerializerView, 'chatroomform')
router.register(r'postingUserProfile', views.postingUserProfile, 'postingUserProfile')
router.register(r'postingRequests', views.postingRequests, 'postingRequests')
router.register(r'postingMessages', views.postingMessages, 'postingMessages')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('userapp.urls')),
    path('', include(router.urls)),
    path('messages/<int:foreign_key_id>/', views.MessageSerielizerView.as_view({'get': 'list'}), name='message-list'),
    path('friendrequest/<int:foreign_key_id>/', views.FriendRequestSerielizerView.as_view({'get':'list'}), name="friendrequest"),
    path('friends/<int:foreign_key_id>/', views.UserProfileSerielizerView.as_view({'get':'list'}), name='friends'),
    path('userID/<int:foreign_key_id>/', views.UserViewById.as_view({'get':'list'}), name='user'),
]
