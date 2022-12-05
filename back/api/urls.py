from django.urls import path
from . import views

urlpatterns = [
    path("", views.getData),
    path("reset/", views.resetAutomata),
    path("move/", views.moveAutomata),
]