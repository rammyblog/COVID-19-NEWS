from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
import requests
from bs4 import BeautifulSoup
import random
import json
import time
from news.models import News, StatesInfo,NigeriaSummaryInfo
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
        self.base_dir = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))
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

    def saving_news_to_db(self, title, image, link, source, summary):
        try:
            News.objects.create(
                title=title,
                image=image,
                link=link,
                source=source,
                summary=summary
            )
            print('Added')
        except IntegrityError:
            print('%s already exists' % (title,))

    def saving_states_cases_to_db(self, state_info):
        for states in state_info:
            # print(states)
            default = {
                'number_confirmed':int(states['total_confirmed']),
                'total_recovered':int(states['total_recovered']),
                'total_deaths':int(states['total_deaths']),
                'total_active':int(states['total_active'])
            }
            StatesInfo.objects.update_or_create(
                state=states['state'],
                defaults=default

            )

    def saving_cases_summary_to_db(self, country_info):
        total_confirmed = int(country_info['total_confirmed_cases'])
        total_recovered = int(country_info['discharged'])
        total_deaths = int(country_info['death'])
        total_active = total_confirmed - total_deaths - total_recovered

        default = {
                'total_tested':country_info['total_samples_tested'],
            'number_confirmed':total_confirmed,
            'total_recovered':total_recovered,
            "total_deaths":total_deaths,
            'total_active':total_active
        }    
        NigeriaSummaryInfo.objects.update_or_create(
            country='Nigeria',
            defaults=default

        )

    def handle(self, *args, **options):
        self.scrape_state_cases()
        self.scrape_punch()
        self.scrape_vanguard()
        self.scrape_premium_times()
        self.scrape_nation()
        self.scrape_daily_post()


    def handle_file_mapping(self, filename):
        path = os.path.join(
            self.base_dir, 'commands/Jsons/{}.json'.format(filename))
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
                    image = (
                        ''.join(str(main_article.find('figure')['data-src']).split(" ")))
                    summary = main_article.find('p').get_text()
                except TypeError:
                    image = ''
                    summary = ''

                title = main_article['title']
                link = main_article['href']
                source = 'Punch'

                # image = image

                self.saving_news_to_db(title, image, link, source, summary)

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
                main_header = article.find_all(
                    "h2", attrs={"class": "entry-title"})[0]
                main_summary = article.find(
                    'div', attrs={"class": "entry-content"})
                # print(main_summary)
                try:
                    image = (
                        ''.join(str(main_article.find('img')['src']).split(" ")))
                    title = main_header.find('a').get_text()
                    link = main_header.find('a')['href']
                    source = 'Vanguard'
                    summary = main_summary.find('p').get_text()[:-9]
                except TypeError:
                    image = ''
                #

                self.saving_news_to_db(title, image, link, source, summary)
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
                    continue
                main_header = article.find_all(
                    "h3", attrs={"class": "jeg_post_title"})[0]
                main_summary = article.find_all(
                    "div", attrs={"class": "jeg_post_excerpt"})[0]
                try:
                    image = ''.join(
                        str(main_article.find('img')['data-src']).split(" "))
                    link = main_header.find('a')['href']
                    title = main_header.find('a').get_text()
                    source = 'Nation Online'
                    summary = main_summary.find('p').get_text()
                except TypeError:
                    continue
                self.saving_news_to_db(title, image, link, source, summary)

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
                    continue
                main_header = article.find_all(
                    "h3", attrs={"class": "a-story-title"})[0].get_text()
                main_summary = article.find_all(
                    "div", attrs={"class": "a-story-content"})[0].get_text()
                try:
                    image = (str(main_article.find('img')['src']))
                    link = main_article.find('a')['href']
                    title = main_header
                    source = 'Premium Times'
                    summary = main_summary
                except TypeError:
                    continue

                self.saving_news_to_db(title, image, link, source, summary)

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
                    summary = title

                except IndexError:
                    continue

                self.saving_news_to_db(title, image, link, source, summary)

        time.sleep(60)

    def scrape_state_cases(self):      
        states_info = []
        states = []
        summary_info = {}
        html = 'https://covid19.ncdc.gov.ng/'
        res = requests.get(html)
        soup = BeautifulSoup(res.text, "html.parser")
        states_table = soup.find(id="custom3")
        summary_table = soup.find(id="custom1")
        states_table_tbody = states_table.find_all("tr")
        summary_table_tbody = summary_table.find_all("tr")


        for s in states_table_tbody:
            if states_table_tbody.index(s) != 0 and states_table_tbody.index(s) != len(states_table_tbody) - 1:
                value = s.get_text().strip()
                states_info.append(value.split('\n\n\n'))

        for tr in summary_table_tbody:
            key = tr.find("td").get_text().strip().lower().split(' ')
            key = ('_').join(key)
            value =tr.find("b").get_text().strip()
            summary_info.update({key:value})

        for state in states_info:
            context = {
                'state': state[0],
                'total_confirmed': state[1].replace('\u202c', ''),
                'total_active': state[2],
                'total_recovered': state[3],
                'total_deaths': state[4],

            }
            states.append(context)

        self.saving_states_cases_to_db(states)
        time.sleep(10)
        self.saving_cases_summary_to_db(summary_info)
        time.sleep(10)
