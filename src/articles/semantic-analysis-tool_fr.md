---
title: How to build a custom tool for enterprise data semantic analysis
layout: article.jade
date: 2016-09-09
author: Charles-Henri Decultot
logo: ../../../images/CH-round.png
preview: An example of data analysis using python/pandas instead of Excel on huge data extract. Spend more time extracting the real value out of your data.
image: ../../../images/test.jpg
---

### TRADUCTION FRANCAISE EN COURS

As a first article on this new blog let's consider a real case.
A few weeks ago a friend was asked by his client to quickly analyze raw data extracted from their customer relationship management tools.
He receives daily extract files from all over the world in `.csv` format and needs to check for the presence of offending words within the sales comments regarding their prospects or customers.

The problem: he didn't have any other tool than Excel to do this analysis efficiently on a daily basis on files with tens of thousands entries each.

Using Excel as an analysis tool can be sufficient to analyze small files punctually because it is flexible and most people know it better than any other software.

Even if Excel usage can be considerably improved by the creation of macros, it lacks the power to handle huge files without the risk of crashing or preventing you from doing anything on your computer while it calculates.
Therefore my friend needed to find another way to automate his task.

A great way to do data analysis is to use the [Python](https://www.python.org/) language with [Pandas](http://pandas.pydata.org/), an associated library providing tools for structuring and analyzing your data.

If you are familiar with Linux or Mac, you can simply install both Python and Pandas through the command line, but I would recommended to install [Anaconda](https://www.continuum.io/anaconda-overview) a complete Data Science platform available for Windows, Mac and Linux.

Anaconda being a complete set of tools, we will start by using [The Jupyter Notebook](http://jupyter.org/) a web application that will allow us to create our small analysis program on our computer.

After the installation of Anaconda, launch The Jupyter Notebook.
To launch it from the terminal on Linux, add the `anaconda/bin` folder in your path: `export PATH=$PATH:"~/anaconda3/bin"` (or add it in your `~/.bashrc` file directly).

Create a new folder on your computer and access it within Jupyter:
![alt text](../../images/20160909-semantic-analysis-tool/20160909-Jupyter.png "My program folder")

Create a new file and choose "Python" as the language.

Before we start creating our program, let's think about what you are trying to achieve.
  1. We receive a `.csv` file containing a certain number of columns and especially all the "comments" from our sales people.
  2. We have a list of words considered as offending and against our ethics and compliance rules.
  3. We need to obtain a report showing any match between the words in the list and the comments from our source file.

For testing purposes, you can generate a mock source file with [Mockaroo](https://www.mockaroo.com/) or [CSVGenerator](http://www.csvgenerator.com/).
Add for example 6 columns ['id, first_name, last_name, email, gender, comments'] and generate a file with 1,000 lines or more (Do some scalability testing before using the program in production). For the comments generate some "Lorem Ipsum" random text.

So we now have an source file called "MOCK_DATA.csv".
We can create a prototype of our program.

```python
#Imports the libraries necessary to handle the csv file and pandas to play with it.
import csv
import pandas as pd

#words can be modified to analyze any words
words = ['lorem', 'ipsum', 'consequat']
#You could also replace the above line with:
#words = pd.read_csv('OFFENDING_WORDS.csv')
#It would allow you to keep a list of all offending words in an external file.
#Be careful in this case, the words must be in the first line, not the first column since pandas will read the first line by default.

#We create a dataframe called 'sourceFile' containing our source data
sourceFile = pd.read_csv('MOCK_DATA.csv')
#We also need to clean the comment column to remove all punctuation and uppercases
sourceFile['comments'] = sourceFile.comments.str.lower().replace('[^A-Za-z0-9]+',' ', regex=True)

#This line displays the result of the first lines of our dataframe in the console
print(sourceFile.head(5))
#We create a dataFrame containing the data to be exported in another '.csv' file for reporting purposes.
exportFile = pd.DataFrame([])

#We checked any match between the comments and the offending words
for word in words:
     sourceFile_words = sourceFile[sourceFile['comments'].str.contains(word)]

#If there is a match, add the columns 'id' and 'comments' to the report. Any other column can be added as well.
     exportFile = exportFile.append(pd.DataFrame( data={"words": word, "id": sourceFile_words['id'], "comments": sourceFile_words['comments']}))

#Export the report in a '.csv' file named analysisResults
exportFile.to_csv('analysisResults.csv')
#Display the result of the analysis also in the console.
print(exportFile)
```

There are several ways to run our program and get the expected report.
For Linux and Mac users the simplest way is to create a new terminal within Jupyter.
For windows users, since the terminal is [not supported](https://github.com/jupyter/notebook/issues/172) execute the program [outside of Jupyter](http://pythoncentral.io/execute-python-script-file-shell/)

In Jupyter's terminal, navigate to the folder containing your program - In my case `/Desktop/Semantic Analysis Program`.
Then execute the program using the python3 command.

```bash
cd ~/Desktop/Semantic Analysis Program
python3 semanticAnalysis.py
```
Check the results in the console and verify that a file name analysisResults.csv has been correctly created.
![alt text](../../images/20160909-semantic-analysis-tool/20160909-Jupyter2.png)

As you can see, it took only a few seconds to analyze the file and provide a clean report instead a minutes/hours on excel.
You can now spend more time to do more valuable tasks like use visualization to find insights in the data.
