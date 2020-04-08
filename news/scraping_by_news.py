import requests
from bs4 import BeautifulSoup

states_info = []
states = []
summary_info = []
html = 'https://covid19.ncdc.gov.ng/'
res = requests.get(html)
soup = BeautifulSoup(res.text, "html.parser")
states_table = soup.find(id="custom3")
summary_table = soup.find(id="custom1")
states_table_tbody = states_table.find_all("tr")
summary_table_tbody = summary_table.find_all("tr")



for s in states_table_tbody:
    if states_table_tbody.index(s) != 0 and states_table_tbody.index(s) != len(states_table_tbody) - 1:
        # print(s.get_text())
        value = s.get_text().strip()
        states_info.append(value.split('\n\n\n'))

for tr in summary_table_tbody:
        key = tr.find("td").get_text().strip().lower().split(' ')
        key = ('_').join(key)
        value =tr.find("b").get_text().strip()
        summary_info.append({key:value})


for state in states_info:
    context ={
        'state': state[0],
        'total_confirmed': state[1],
        'total_active': state[2],
        'total_recovered': state[3],
        'total_death': state[4],

    }
    states.append(context)


print(states)