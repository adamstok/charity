from django.contrib import admin

# Register your models here.

from donation.models import Category, Donation, Institution, type_choices, Messages

admin.site.register(Category)
admin.site.register(Donation)
admin.site.register(Institution)
admin.site.register(Messages)
