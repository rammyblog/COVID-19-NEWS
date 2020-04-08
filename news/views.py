from django.shortcuts import render
from .models import News, StatesInfo, NigeriaSummaryInfo
from rest_framework import generics, viewsets
from .serializers import NewsSerializers, StatesInfoSerializers, NigeriaSummaryInfoSerializers
from rest_framework.response import Response
from django.utils import timezone


class NewsList(generics.ListAPIView):
    queryset = News.objects.order_by('-created')[:100]
    serializer_class = NewsSerializers

    def list(self, request):
        queryset = self.get_queryset()
        serializer = NewsSerializers(queryset, many=True)
        context = {
            'message': 'success',
            'news': serializer.data
        }
        return Response(context)


class StateList(generics.ListAPIView):
    queryset = StatesInfo.objects.all()
    serializer_class = StatesInfoSerializers

    def list(self, request):
        queryset = self.get_queryset()
        serializers = StatesInfoSerializers(queryset, many=True)

        context = {
            'message': 'success',
            'length': len(queryset),
            'data': serializers.data,
        }

        return Response(context)


class NigeriaSummaryInfoList(generics.ListAPIView):
    queryset = NigeriaSummaryInfo.objects.all()
    serializer_class = NigeriaSummaryInfoSerializers


    def list(self, request):
        queryset = self.get_queryset()
        serializers = NigeriaSummaryInfoSerializers(queryset, many=True)

        context = {
            'message': 'success',
            'data':serializer.data
        }
        return Response(context)
