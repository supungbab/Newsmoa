import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import chromedriver_autoinstaller
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_ver = chromedriver_autoinstaller.get_chrome_version().split('.')[0]
# 옵션 생성
options = webdriver.ChromeOptions()
# background run
options.add_argument("headless")
try:
    browser = webdriver.Chrome(f'./{chrome_ver}/chromedriver.exe', options= options)   
except:
    chromedriver_autoinstaller.install(True)
    browser = webdriver.Chrome(f'./{chrome_ver}/chromedriver.exe', options= options)

browser.implicitly_wait(10)

url = "https://news.naver.com/"
browser.get(url)

category = {'정치':"#lnb > ul > li:nth-child(3) > a > span"
            ,"경제": "#lnb > ul > li:nth-child(4) > a > span"
            ,"사회": "#lnb > ul > li:nth-child(5) > a > span"
            ,"생활/문화": "#lnb > ul > li:nth-child(6) > a > span"
            ,"세계": "#lnb > ul > li:nth-child(7) > a > span"
            ,"IT/과학": "#lnb > ul > li:nth-child(8) > a > span"
}

#DB
from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client['newsmoa']
boards = db['boards']

for cat, selecetor in category.items():
    elem = browser.find_element_by_css_selector(selecetor)
    elem.click()

    for j in 1,2,3,4,5:
        try:
            elem = browser.find_element_by_xpath("//*[@id='section_body']/ul[1]/li[" + str(j) + "]/dl/dt[2]/a")
        except:
            elem = browser.find_element_by_xpath("//*[@id='section_body']/ul[1]/li[" + str(j) + "]/dl/dt/a")

        elem.click()
        try:
            elem = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.XPATH, "//*[@id='articleTitle']")))
            soup = BeautifulSoup(browser.page_source, "lxml")
            datetime = soup.select("#main_content > div.article_header > div.article_info > div > span.t11")[0].text
            import datetime as dt
            from dateutil.parser import parse
            n_mrdm = ' AM' if datetime[11:13] == '오전' else ' PM'
            n_datetime = parse(datetime.replace(".", "-", 2).replace(".", "").replace("오전 ", "").replace("오후 ", "") + n_mrdm)
            now_date = dt.datetime.now()
            td = now_date - n_datetime
            # 최근 10분이내 올라온 기사만 수집
            if(td.seconds/60 > 10): continue

            title = soup.select("#articleTitle")[0].text
            media = soup.select("#main_content > div.article_header > div.press_logo > a > img")[0].get("title")
            content = str(soup.select("#articleBodyContents")[0])

            news = {"title": title, "date": datetime, "media": media, "category": cat, "content":content}
            #print(news)
            x = boards.update({"title": title}, dict(news), upsert=True)

            
        finally:
            browser.back()

print("END")
browser.quit()
