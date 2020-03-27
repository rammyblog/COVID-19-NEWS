
from django.urls import path
from .views import NewsList
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'short', NewsListViewset, basename='short_url')
urlpatterns = [
    path('news', NewsList.as_view(), name='news_list')
]


# urlpatterns += router.urls

