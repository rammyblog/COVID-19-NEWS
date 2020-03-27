from django.core.management.base import BaseCommand
import requests
from bs4 import BeautifulSoup
import random
import json
import time
from news.models import News
import os
import argparse

user_agent_list = [
    # Chrome
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    # Firefox
    'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 6.2; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)'
]


class Command(BaseCommand):
    help = "Getting data"

    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {"User-Agent": random.choice(user_agent_list)}
        self.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.news = []

    def parse_html(self, json_object):
        data = json.loads(json_object.read())
        content = self.session.get(data[0]['link']).content
        soup = BeautifulSoup(content, 'html.parser')
        context = {
            'data': data,
            'soup': soup
        }
        return context

    def saving_to_db(self, title, image, link, source):
        try:
            News.objects.create(
                title=title,
                image=image,
                link=link,
                source= source
            )
            print('Added')
        except:
            print('%s already exists' % (title,))

    def handle(self, *args, **options):
        self.scrape_vanguard()
        self.scrape_daily_post()

    def handle_file_mapping(self, filename):
        path = os.path.join(self.base_dir, 'commands/Jsons/{}.json'.format(filename))
        return path

    def scrape_punch(self):
        path = self.handle_file_mapping('Punch')
        with open(path, 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.select('.' + data['selector'])
            for article in articles:
                main_article = article.find_all('a')[0]
                try:
                    image = (''.join(str(main_article.find('figure')['data-src']).split(" ")))
                except TypeError:
                    image = ''

                title = main_article['title']
                link = main_article['href']
                source = 'Punch'

                # image = image
                print(image, title, link)
                self.saving_to_db(title, image, link, source)
                # self.news.append(main_article_dict)
            time.sleep(60)

    def scrape_vanguard(self):
        path = self.handle_file_mapping('Vanguard')
        with open(path, 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.find_all('article', class_=data['selector'])
            for article in articles:
                main_article = article.find_all('a')[0]
                main_header = article.find_all("h2", attrs={"class": "entry-title"})[0]
                try:
                    image = (''.join(str(main_article.find('img')['src']).split(" ")))
                    title = main_header.find('a').get_text()
                    link = main_header.find('a')['href']
                    source = 'Vanguard'
                except TypeError:
                    image = ''
                #

                self.saving_to_db(title, image, link, source)
                # self.news.append(main_article_dict)

        time.sleep(60)

    def scrape_nation(self):
        path = self.handle_file_mapping('NationOnline')
        with open(path, 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.find_all('article', class_=data['selector'])
            for article in articles:
                try:

                    main_article = article.find_all('div', attrs={
                        "class": 'jeg_thumb'
                    })[0]
                except IndexError:
                    continue;
                main_header = article.find_all("h3", attrs={"class": "jeg_post_title"})[0]

                try:
                    image = ''.join(str(main_article.find('img')['data-src']).split(" "))
                    link = main_header.find('a')['href']
                    title = main_header.find('a').get_text()
                    source = 'Nation Online'
                except TypeError:
                    continue
                self.saving_to_db(title, image, link, source)
                # self.news.append(main_article_dict)
        time.sleep(60)

    def scrape_premium_times(self):
        path = self.handle_file_mapping('PremiumTimes')
        with open(path, 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.find_all('div', class_=data['selector'])
            for article in articles:
                try:
                    main_article = article.find_all('div', attrs={
                        "class": 'story-img-container'
                    })[0]
                except IndexError:
                    continue;
                main_header = article.find_all("h3", attrs={"class": "a-story-title"})[0].get_text()
                try:
                    image = (str(main_article.find('img')['src']))
                    link = main_article.find('a')['href']
                    title = main_header
                    source = 'Premium Times'

                except TypeError:
                    continue;

                self.saving_to_db(title, image, link, source)

        return time.sleep(60)

    def scrape_daily_post(self):
        path = self.handle_file_mapping('DailyPost')
        with open(path, 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.find_all('li', class_=data['selector'])
            for article in articles:
                try:
                    image = article.find_all('div', attrs={
                        "class": 'mvp-blog-story-img'
                    })[0].find('img')['data-src']
                    link = str(article.find('a')['href'])
                    title = article.find('div', attrs={
                        "class": 'mvp-blog-story-text'
                    }).find('h2').get_text()
                    source = 'Daily Post'

                except IndexError:
                    continue;

                self.saving_to_db(title, image, link, source)

        time.sleep(60)
