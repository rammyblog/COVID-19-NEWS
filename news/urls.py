
from django.urls import path
from .views import NewsList, StateList
# from rest_framework.routers import DefaultRouter
#
# router = DefaultRouter()
# router.register(r'news', NewsList, basename='news_list')
urlpatterns = [
    path('news/', NewsList.as_view(), name='news_list'),
    path('cases-by-states/', StateList.as_view(), name='cases_by_states')
]


# urlpatterns += router.urls

