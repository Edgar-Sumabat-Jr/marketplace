# admin.py
from django.contrib import admin
# from .models import CustomUser, Product
# from django.contrib.auth.admin import UserAdmin
from .models import *

# class CustomUserAdmin(UserAdmin):
#     # Add the fields you want to display on the user list page
#     list_display = ('username', 'email', 'first_name', 'last_name', 'birth_date', 'is_staff', 'is_active', 'date_joined')

#     # Add the fields to be displayed on the user detail page
#     fieldsets = UserAdmin.fieldsets + (
#         (None, {'fields': ('birth_date',)}),  # Add 'birth_date' field
#     )

#     # Add the fields that appear in the user creation form
#     add_fieldsets = UserAdmin.add_fieldsets + (
#         (None, {'fields': ('birth_date',)}),  # Add 'birth_date' to the creation form
#     )

#     # Optionally, you can also specify which fields are searchable or filterable
#     search_fields = ('username', 'email', 'first_name', 'last_name')
#     list_filter = ('is_staff', 'is_active', 'date_joined')

# # Register the custom user model with the custom admin class
# admin.site.register(CustomUser, CustomUserAdmin)



admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
