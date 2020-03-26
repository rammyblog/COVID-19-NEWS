import requests
from bs4 import BeautifulSoup
import random
import json

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

GLOBAL_MYCLASS_LIST = []

class Scraper:

    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {"User-Agent": random.choice(user_agent_list)}
        GLOBAL_MYCLASS_LIST.append(self)
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

    def scrape_punch(self):
        with open('Jsons/Punch.json', 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.select('.' + data['selector'])
            for article in articles:
                main_article = article.find_all('a')[0]
                try:
                    image = (str(main_article.find('figure')['data-src']).split(" "))
                except TypeError:
                    image = ''
                main_article_dict = {
                    "title": main_article['title'],
                    "link": main_article['href'],
                    "image": image

                }
                self.news.append(main_article_dict)
                return main_article_dict

    def scrape_vanguard(self):
        with open('Jsons/Vanguard.json', 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.find_all('article', class_=data['selector'])
            for article in articles:
                main_article = article.find_all('a')[0]
                main_header = article.find_all("h2", attrs={"class": "entry-title"})[0]
                try:
                    image = (str(main_article.find('img')['src']).split(" "))
                except TypeError:
                    image = ''
                #
                main_article_dict = {
                    "title": main_header.find('a').get_text(),
                    "link": main_header.find('a')['href'],
                    "image": image

                }
                self.news.append(main_article_dict)
        print(self.news)
        return self.news

    def scrape_nation(self):
        with open('Jsons/NationOnline.json', 'r') as sites:
            context_data = self.parse_html(sites)
            data, soup = context_data['data'][0], context_data['soup']
            articles = soup.find_all('article', class_=data['selector'])
            for article in articles:
                try:

                    main_article = article.find_all('div', attrs={
                        "class": 'jeg_thumb'
                    })[0]
                except IndexError:
                    break;
                main_header = article.find_all("h3", attrs={"class": "jeg_post_title"})[0]

                try:
                    image = ''.join(str(main_article.find('img')['data-src']).split(" "))
                    link = main_header.find('a')['href']
                    title = main_header.find('a').get_text()
                except TypeError:
                    break;

                main_article_dict = {
                    "title": main_header.find('a').get_text(),
                    "link": main_header.find('a')['href'],
                    "image": image

                }
                self.news.append(main_article_dict)
        return self.news

    def scrape_premium_times(self):
        with open('Jsons/PremiumTimes.json', 'r') as sites:
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
                except TypeError:
                    continue;
                main_article_dict = {
                    "title": main_header,
                    "link": link,
                    "image": image
                }

                print(main_article_dict)
                self.news.append(main_article_dict)
        return self.news

    def scrape_daily_post(self):
        with open('Jsons/DailyPost.json', 'r') as sites:
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
                except IndexError:
                    continue;

                main_article_dict = {
                    "title": title,
                    "link": link,
                    "image": image
                }

                print(main_article_dict)
                self.news.append(main_article_dict)
        return self.news


# def scrape_urls(news_link):
#     for a in news_link.find_all('a', href=True):
#         print("Found the URL:", a['href'])



