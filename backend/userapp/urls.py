from django.urls import path
from .views import MyTokenPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]