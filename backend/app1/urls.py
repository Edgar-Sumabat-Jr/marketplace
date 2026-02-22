from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

# # from .views import UserRegistrationAPIView
# from .views import UserProfileAPIView
# from .views import CustomTokenObtainPairView

from .views import getRoutes

from .views import getProducts # gets all products
from .views import getProduct # gets individual products, requires primary key


from rest_framework_simplejwt.views import (TokenObtainPairView,)


urlpatterns = [
    # path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # # path('api/register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    # path('api/profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('api/products/', views.getProducts, name='products'),
    path('api/product/<str:pk>', views.getProduct, name='product'),
    path('api/getroutes/', views.getRoutes, name='routes'),

    path('api/users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/profile/', views.getUserProfile, name="user-profile"),

#----------start, october 19, 2025--------------------#
    path('api/users/', views.getUsers, name="users"),
    path('api/users/register/', views.registerUser, name='register'),
#----------end, october 19, 2025----------------------#



#----------start, november 2, 2025----------------------#
    path('api/orders/add/', views.addOrderItems, name='orders-add'),

#----------end, november 2, 2025------------------------#


#----------start, november 5, 2025------------------------#
    path('api/orders/<str:pk>/', views.getorderById, name='user-order'),  

#----------end, november 5, 2025------------------------#


#----------start, november 6, 2025------------------------#
    path('api/profile/', views.getUserProfile, name='user-profile'),
    path('api/profile/update', views.updateUserProfile, name='user-profile-update'),
    path('api/myorders/', views.getMyOrders, name='myorders'),
    
#----------end, november 6, 2025------------------------#


#----------start, november 7, 2025------------------------#
    path('api/orders/<str:pk>/pay/', views.updateOrdertoPaid, name='pay'),

#----------end, november 7, 2025------------------------#

]