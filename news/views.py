from django.shortcuts import render
from .models import News
from rest_framework import generics, viewsets
from .serializers import NewsSerializers
from rest_framework.response import Response


class NewsList(generics.ListAPIView):
    queryset = News.objects.all().order_by('-created')
    serializer_class = NewsSerializers

    def list(self, request):
        queryset = self.get_queryset()
        serializer = NewsSerializers(queryset, many=True)
        context = {
            'message' : 'success',
            'news' : serializer.data
        }
        return Response(context)
