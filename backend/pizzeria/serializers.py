from rest_framework import serializers
from .models import Pizza

class PizzaSerializer(serializers.ModelSerializer):
    photoName = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Pizza
        fields = '__all__'