from django.urls import path, include
from pizzeria.views import index, PizzaListCreateAPIView, PizzaRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', index),
    path('pizzas/', PizzaListCreateAPIView.as_view(), name='pizza-list-create'),
    path('pizzas/<int:pk>/', PizzaRetrieveUpdateDestroyAPIView.as_view(), name='pizza-detail'),
]
