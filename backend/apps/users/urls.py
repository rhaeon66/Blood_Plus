from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from apps.users.views import (
    RegisterView,
    LoginView,
    ProfileView,
    UserListView,
)

app_name = "users"

urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile",
    ),

    path(
        "users/",
        UserListView.as_view(),
        name="user-list",
    ),
]