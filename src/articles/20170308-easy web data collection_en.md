---
id: 20170308
title: An Easy Way to Collect Data from a Website
layout: article.jade
date: 2017-03-08
author: Charles-Henri Decultot
logo: ../../../images/CH-round.png
preview: You need to scrap data from a website in order to format it or work on it in a better suited tool ? Here is a simple way to start with.
image: ../../../images/heroImages/20170308-webscraping.jpg
---
Over the past weeks, I have been working on the improvement of the french translations in ERPNext with the help of other people from the community.
Despite the huge work already done - more than 4000 sentences have been already verified from a total of 7000 - there is still a lot of improvement room.

With [Quentin Revel](https://github.com/qrevel), we have decided to join our efforts and to work in collaboration in order to lower the amount of work for each of us and to check each others work to ensure the quality of the translations before we add them into the [translation portal.](https://translate.erpnext.com/)
</br>

The easiest way was therefore to a create repository on [Github](https://github.com/qrevel/erpnext-translations), to fetch the data on the translation portal, work on them in a spreadsheet and upload everything in Github for review before validation.

The only issue was to find a way to extract these data in a formatted way...

#### The Structure of the Website

Before going into the creation of any script, we need to understand the structure of a webpage and especially this particular webpage.

Here is a screenshot of the actual portal created by [Frappe](https://frappe.io/), the team behind ERPNext, to facilitate the collaboration of the community to the project. To be honest, this is a really great tool to allow non-technical people to contribute to an open-source project.
![ERPNext Translations Portal](../../../images/articles/20170308-162105.png)
</br>
Now, if we select CTRL+SHIFT+I in Chrome, we can see how its HTML is structured.
![ERPNext Translations Portal + HTML](../../../images/articles/20170308-163153.png)

As you can see, each sentence is held in a "div" tag with the class "single-message".
Inside this block, we can find a particular "div" for the english and the translated sentences. Only the translation is recognizable through to a separate class called "translated"

So we can now imagine to extract the data in two steps: first collect all "div" containing the "single-message" class to obtain a list of all translations, then divide each object of this list into an english and a french column.

We just need to extract the english and french sentences, not the name of the translator, date or verified status, but it would have been possible also.

#### Writing a Small Scraping Script

As a tool of choice, I recommend to use [Jupyter Notebook](http://jupyter.org/) since it is easy to use and very fast to setup.

``` python
import requests
import pandas as pd
from bs4 import BeautifulSoup

english = []
french = []

url = "https://translate.erpnext.com/view?lang=fr&c=A"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'lxml')
rows = soup.find_all('div',attrs={"class" : "single-message"})

for row in rows:
    nonTranslated_row = row.find('i').previousSibling
    english.append(nonTranslated_row.string.strip())

    translated_row = row.find('div',attrs={"class" : "translated"})
    french.append(translated_row.string.strip())

df = pd.DataFrame(data = {"English": english, "Français": french})
df.head(10)

df.to_csv("letter-a.csv", encoding="utf-8")
```

As you can see we are using the usual Pandas library to format our data, but also an other library called BeautifulSoup. This is the tool that will allow us to extract data from this website.

The workflow of the script is relatively simple:

1. It creates to arrays to hold our english and french sentences.
2. It goes to the given URL, read its data and extract it.
3. It finds all "div" with the class "single-message".
4. For each object found above, it looks for the english and the french word.
5. It formats the data in two columns
6. It exports a .csv file so that we can edit it in LibreOffice and work on it more efficiently.

The only little trick here is the way it finds the english word.

For the french word its quite easy since we have a specific class on the "div" tag, but for the english one there is no diffenciator from any other "div" in the page.

But since there is a "i" tag just below the english word and it is the only "i" tag in the object, we can tell the script to select the element just before itself.

Just run the cell in Jupyter Notebook and the .csv file will be exported in your script folder.

You can do the same operation for each letter on the portal by changing the URL and the export file name as needed.
</br>
You need an analysis for your project or advices on this topic ? Don't hesitate to contact me at [DOKOS](https://www.dokos.io), I'll be happy to help you!
