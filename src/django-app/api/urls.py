from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('alpha/', views.alpha, name='alpha'),
    path('beta/', views.beta, name='beta'),
    path('gamma/', views.gamma, name='gamma'),
    path('delta/', views.delta, name='delta'),
]
