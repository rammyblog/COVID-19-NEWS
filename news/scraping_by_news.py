import requests
from bs4 import BeautifulSoup

states_info = []

html = 'https://covid19.ncdc.gov.ng/'
res = requests.get(html)
soup = BeautifulSoup(res.text, "html.parser")
table = soup.find(id="custom3")
tbody = table.find_all("tr")

for s in tbody:
    if tbody.index(s) != 0 and tbody.index(s) != len(tbody) - 1:
        states_info.append({"state": s.find("td").get_text().strip(), "num": s.find("b").get_text()})
        states_info.append({"state": s.select("td:nth-child(3)")[0].get_text().strip(),
                            "num": s.select("p > b")[1].get_text()})
    if tbody.index(s) == len(tbody) - 1:
        states_info.append({"state": s.find("td").get_text().strip(), "num": s.find("b").get_text()})

print(states_info, len(states_info))
