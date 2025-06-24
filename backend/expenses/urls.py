from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_expense, name='create_expense'),
    path('expenses/', views.show_expense, name='show_expense'),
]
