from rest_framework import serializers
from .models import News, StatesInfo, NigeriaSummaryInfo
class NewsSerializers(serializers.ModelSerializer):

    class Meta:
        model = News
        fields = '__all__'


class StatesInfoSerializers(serializers.ModelSerializer):

    class Meta:
        model = StatesInfo
        fields = ('state', 'number_confirmed', 'total_recovered', 'total_deaths', 'total_active')


class NigeriaSummaryInfoSerializers(serializers.ModelSerializer):

    class Meta:
        model = NigeriaSummaryInfo
        fields = ('datetime_created', 'datetime_updated','country', 'total_tested','number_confirmed', 'total_recovered', 'total_deaths', 'total_active')