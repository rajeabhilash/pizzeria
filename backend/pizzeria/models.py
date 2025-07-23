from django.db import models

# Create your models here.
class Pizza(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2) # e.g., 12.00
    photoName = models.ImageField(upload_to='pizzas/') # Images will be stored in media/pizzas/
    soldOut = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = "Pizzas" # Makes the admin readable
        ordering = ['name'] # Order pizzas alphabetically by default

    def __str__(self):
        return self.name