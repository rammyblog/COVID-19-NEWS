from django.db import models
from django.db.models.aggregates import Count
from random import randint

class TimeStamp(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        abstract = True


class News(TimeStamp):
    title = models.CharField(max_length=5000, help_text='Title of News', unique=True)
    image = models.CharField(help_text='Url of News Image', max_length=6000)
    link = models.CharField(help_text='Link of news', max_length=5000),
    source = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.title
