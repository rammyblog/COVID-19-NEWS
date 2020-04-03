from django.db import models
from django.db.models.aggregates import Count
from random import randint


class News(models.Model):
    title = models.CharField(max_length=5000, help_text='Title of News', unique=True)
    image = models.CharField(help_text='Url of News Image', max_length=6000)
    link = models.CharField(help_text='Url of News Image', max_length=6000, default='')
    source = models.CharField(max_length=100, blank=True)
    summary = models.CharField(max_length=5000, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class StatesInfo(models.Model):
    state = models.CharField(max_length=250, help_text='State', unique=True)
    number_confirmed = models.IntegerField(help_text='Number of confirmed Coronavirus cases')

    def __str__(self):
        return '{0} has {1} confirmed cases'.format(self.state, self.number_confirmed)
