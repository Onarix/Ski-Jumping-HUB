import requests
from flask import Flask, request, jsonify, abort
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import datetime

# type 'flask --app API run' to start locally
app = Flask(__name__, template_folder='html')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/results/", methods=['GET'])
def getResults():
    today = datetime.date.today()
    year = today.year
    url = "https://www.fis-ski.com/DB/general/statistics.html?statistictype=positions&positionstype=position&offset=50&sectorcode=JP&seasoncode=" + str(year + 1) + "&categorycode=WC&gendercode=M&competitornationcode=&place=&nationcode=&position=4&disciplinecode="
    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'lxml')

    # find competitions, dates and nations
    comps = soup.find_all('a', class_='bb-xs pb-xs-1_1 g-xs-11 g-sm-6 g-md-4 g-lg-4 justify-left bold', href=True)
    dates_soup = soup.find_all('a', class_='bb-xs pb-xs-1_1 pl-xs-1 g-xs-6 g-sm-3 g-md-2 g-lg-2 justify-left')
    
    competitions = dict()
    dates = list()

    for date in dates_soup:
        dates.append(date.text)
    
    i = 0
    for comp in comps:
        competitions[str(comp['href'])] = [str(comp.text), str(dates[i])]
        i += 1

    print(competitions)
    return jsonify(competitions)

@app.route("/news/", methods=['GET'])
def getNews():
    url = "https://news.google.com/search?q=ski%20jumping&hl=pl&gl=PL&ceid=PL%3Apl"
    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'lxml')

    # find news titles, pictures and publish date
    news_soup = soup.find_all('h4')
    
    links = list()
    dates = list()
    imgs = list()
    news = dict()
    

    base_url = 'https://news.google.com'
    for link in soup.find_all('a', href=True):
        if(str(link['href']).startswith('./articles/')):
            links.append(base_url + link['href'][1:])

    links = links[:5]


    for date in soup.find_all('time'):
        dates.append(date.text)
    
    for img in soup.find_all('img', class_='Quavad', src=True):
        imgs.append(img['src'])

    imgs = imgs[:5]

    i = 0
    for elem in news_soup[:5]:
        news[links[i]] = [elem.text, dates[i], imgs[i]]
        i += 1

    return jsonify(news)
