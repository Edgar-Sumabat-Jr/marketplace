# from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from django.contrib.auth.password_validation import validate_password
# from django.contrib.auth.models import User

# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = get_user_model()
#         fields = ['username', 'email', 'password', 'password2', 'birth_date']

#     def validate_email(self, value):
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError("Email already exists")
#         return value

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError("Passwords must match.")
#         return attrs

#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         validated_data.pop('password2')  # Remove password2 (we don't pass this to the model)
#         user = get_user_model().objects.create(**validated_data)
#         user.set_password(password)
#         user.save()
#         return user


# # # custom token to use email for login
# # from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# # class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
# #     @classmethod
# #     def get_token(cls, user):
# #         token = super().get_token(user)
# #         # Add any custom claims you want to include in the token here
# #         return token



# # Custom TokenObtainPairSerializer to use email for authentication

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from django.contrib.auth import authenticate

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields.pop('username', None)  # Remove the default username field

#     def validate(self, attrs):
#         email = attrs.get('email')
#         password = attrs.get('password')

#         # Manually authenticate using the email
#         user = authenticate(request=self.context.get('request'), username=email, password=password)

#         if not user:
#             raise serializers.ValidationError('No active account found with the given credentials')

#         # Use the parent method to get the token
#         refresh = self.get_token(user)

#         data = {
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#             'email': user.email,
#             'username': user.username,
#         }

#         return data


# products serializers

from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'


#----------------october 18, 2025---------------------#
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'name', 'username', 'email', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    

from rest_framework_simplejwt.tokens import RefreshToken
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)




#-------------start, november 2, 2025-------------------#

from rest_framework import serializers

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            # lowercase: Django auto-creates the reverse accessor from model name
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except ShippingAddress.DoesNotExist:
            address = False
        return address


    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False).data
        return serializer


#-------------end, november 2, 2025-------------------#