from django.db import models
from django.contrib.auth.models import User

# Create your models here.

type_choices = (
    ('fundacja', 'fundacja'),
    ('organizacja pozarządowa', 'organizacja pozarządowa'),
    ('zbiórka lokalna', 'zbiórka lokalna'),
)



class Category(models.Model):
    name = models.CharField(max_length=150)
    def __str__(self):
        return f'{self.name}'

class Institution(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    type_choice = models.TextField(choices=type_choices, default='fundacja')
    categories = models.ManyToManyField(Category)
    def category(self):
        outp = ''
        for x in self.categories.all():
            outp += f' - {x.name} - '
        return outp
    def __str__(self):
        return f'{self.type_choice} {self.name} - {self.description} - Categories: {self.category()}'

class Donation(models.Model):
    quantity = models.IntegerField()
    categories = models.ManyToManyField(Category)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    city = models.CharField(max_length=50)
    zip_code = models.IntegerField()
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    pick_up_comment = models.TextField()
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    def category(self):
        outp = ''
        for x in self.categories.all():
            outp += f' - {x.name} - '
        return outp
    def __str__(self):
        return f'User: {self.user.username} - {self.quantity} {self.category()} to {self.institution}'

