
from django.urls import path
from .views import NewsList
# from rest_framework.routers import DefaultRouter
#
# router = DefaultRouter()
# router.register(r'news', NewsList, basename='news_list')
urlpatterns = [
    path('news/', NewsList.as_view(), name='news_list')
]


# urlpatterns += router.urls

