from django.shortcuts import render
from .models import News
from rest_framework import generics
from .serializers import NewsSerializers


class NewsList(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializers


