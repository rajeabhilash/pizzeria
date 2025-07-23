from django.shortcuts import render, HttpResponse
# from django.http import Http404
from rest_framework import generics
from .models import Pizza
from .serializers import PizzaSerializer

# Create your views here.
def index(request) :
    # if True:
    #     raise Http404("Kya Manus Banega Re tu!!")
    return HttpResponse("<h1> Pizzeria & Co. API </h1>")

class PizzaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer

class PizzaRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    lookup_field = 'pk'