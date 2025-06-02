from bs4 import BeautifulSoup
from seleniumbase import SB
import json

reviews_data = []

with SB(uc=True, test=True, locale="en") as sb:
    url = "https://www.indeed.com/cmp/Walmart/reviews"
    sb.activate_cdp_mode(url)
    sb.uc_gui_click_captcha()
    sb.sleep(2)
    page_html = sb.get_page_source()
    soup = BeautifulSoup(page_html, 'html.parser')

    reviewList = soup.find('ul', class_='css-u74ql7 eu4oa1w0')
    
    for child in reviewList: 
        spans = child.find_all('span', class_='css-15r9gu1 eu4oa1w0')
        if len(spans) >= 2: 
            title = spans[0]
            description = spans[1]
            review = {
                'title' : title.text.strip(),
                'description': description.text.strip(),
                'company' : 'Walmart', 
            }
            reviews_data.append(review)
        
with open('reviews.json', 'w', encoding='utf-8') as f: 
    json.dump(reviews_data, f, indent=2, ensure_ascii=False)

