from rest_framework import serializers
from .models import News, StatesInfo

class NewsSerializers(serializers.ModelSerializer):

    class Meta:
        model = News
        fields = '__all__'


class StatesInfoSerializers(serializers.ModelSerializer):

    class Meta:
        model = StatesInfo
        fields = ('state', 'number_confirmed',)