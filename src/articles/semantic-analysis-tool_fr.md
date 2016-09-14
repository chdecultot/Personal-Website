---
id: 2016090901
title: Facilitez l'analyse de vos données grâce aux bons outils
layout: article.jade
date: 2016-09-09
author: Charles-Henri Decultot
logo: ../../../images/CH-round.png
preview: Un exemple d'analyse de données en utilisant Python/Pandas au lieu d'Excel sur de larges échantillons de données. Gagnez du temps pour extraire plus de valeur de vos données.
image: ../../../images/semanticAnalysis.jpg
---
Pour ce premier article, considérons un cas réel.  
<br/>  
   
Il y a quelques semaines, le client d'un ami lui a demandé d'analyser rapidement des données brutes extraites de leur CRM (logiciel de gestion de la relation client).  

Chaque jour il reçoit des extraits venant du monde entier au format `.csv`. Il doit ensuite vérifier la présence de certains mots considérés comme choquants au sein des commentaires entrés par les commerciaux au sujets de leurs prospects ou clients.  
  
  
**Problème**: Il n'avait pas d'autre outil qu'Excel pour faire cette analyse efficacement de manière quotidienne sur des fichiers comprenant des milliers d'entrées chacun.  

##### Trouver les bons outils

Excel est un outil d'analyse utile et suffisant pour traiter de petits fichiers ponctuellement, car il est flexible et la plupart des gens le connaisse mieux qu'aucun autre logiciel.  
<br/>  

Même si l'usage d'Excel peut être considérablement amélioré grâce à la création de macros, il  manque de puissance pour gérer de gros fichiers sans risque de crash ou de blocage complet de l'ordinateur lorsqu'il effectue ses calculs.  

Du coup mon ami avait besoin de trouver un autre moyen d'automatiser sa tâche.  
<br/>  
  
Une excellente manière de faire de l'analyse de données est d'utiliser le language [Python](https://www.python.org/) couplé à [Pandas](http://pandas.pydata.org/), une librairie associée fournissant les outils pour structurer et analyser vos données.  
<br/>  
  
Si vous êtes familiers de Linux ou Mac, vous pouvez simplement installer Python et Pandas par la ligne de commande, mais je vous recommande d'installer [Anaconda](https://www.continuum.io/anaconda-overview) une plateforme complète de sciences de données disponible pour Windows, Mac et Linux.  
<br/>  
  
Anaconda comprenant de nombreux outils, nous allons commencer par utiliser [The Jupyter Notebook](http://jupyter.org/), une application web qui va nous permettre de créer un petit programme d'analyse sur notre ordinateur.  

##### Utiliser The Jupyter Notebook

Après l'installation d'Anaconda, démarrez The Jupyter Notebook.  
  
  
Pour le lancer depuis le terminal sous Linux, ajouter le dossier `anaconda/bin` dans votre chemin principal (path): `export PATH=$PATH:"~/anaconda3/bin"` (ou ajoutez le directement dans votre fichier `~/.bashrc`).  
<br/>  
  
Créez un nouveau dossier sur votre ordinateur et accédez-y dans Jupyter:  
![alt text](../../../images/20160909-Jupyter.png "My program folder")
  
  
Créez un nouveau fichier et choisissez "Python" comme language.  
<br/>  
  
Avant de commencer à rédiger notre programme, pensons à ce que nous essayons d'accomplir.
  1. Nous recevons un fichier `.csv` contenant un certain nombre de colonnes et notamment tous les commentaires de nos commerciaux.
  2. Nous avons une liste de mots considérés comme choquants et allant à l'encontre des standards éthiques de l'entreprise.
  3. Nous avons besoin d'obtenir un rapport contenant le résultat de la comparaison entre les mots dans la liste et les commentaires de notre fichier source.
  
  
Afin de tester, vous pouvez générer un faux fichier source avec [Mockaroo](https://www.mockaroo.com/) ou [CSVGenerator](http://www.csvgenerator.com/).  
  
  
Ajoutez par exemple 6 colonnes ['id, first_name, last_name, email, gender, comments'] et générez un fichier de 1000 lignes ou plus (Faites des tests d'échelle avant d'utiliser le programme en production). Pour les commentaires générez du texte aléatoire de type "Lorem Ipsum".
<br/>  
  
Donc nous avons un fichier un source nommé "MOCK_DATA.csv".
<br/>  
  
Nous pouvons créer un prototype de notre programme.

##### Ecrire un petit programme

Commencez par importer les librairies nécessaires pour gérer le fichier csv et Pandas pour jouer avec.  

```
\1 import csv  
  
\2 import pandas as pd  
```

Ajoutez tous les mots choquants à rechercher.  

    \3 words = ['lorem', 'ipsum', 'consequat']  


Vous pouvez aussi remplacer la ligne ci-dessus avec:  

    \3 words = pd.read_csv('OFFENDING_WORDS.csv')  

Cela vous permettra de garder la liste de mots choquants dans un fichier externe.  
  
  
Attention dans ce cas, les mots doivent être sur la première ligne et non la première colonne puisque Pandas lit la première ligne par défaut.  
<br/>  

Ensuite créez un "dataframe" appelé 'sourceFile' contenant notre source de données et nettoyez la colonne de commentaires pour supprimer toutes ponctuation et majuscules.  

    \4 sourceFile = pd.read_csv('MOCK_DATA.csv')  

    \5 sourceFile['comments'] = sourceFile.comments.str.lower().replace('[^A-Za-z0-9]+',' ', regex=True)  

    \6 print(sourceFile.head(5))  
    
Créez également un "dataframe" contenant les données à exporter dans un autre fichier '.csv' pour pouvoir faire vos analyses.  

    \7 exportFile = pd.DataFrame([])  

Vérifiez toute concordance entre les commentaires et les mots choquants.  

    \8 for word in words:
    \9 sourceFile_words = sourceFile[sourceFile['comments'].str.contains(word)]

S'il y a concordance, ajoutez les colonnes 'id' et 'comments' au rapport.   

Toute autre colonne peut également être ajoutée.  

    \10 exportFile = exportFile.append(pd.DataFrame( data={"words": word, "id": sourceFile_words['id'], "comments": sourceFile_words['comments']}))  


Exportez le rapport dans un fichier '.csv' nommé 'analysisResults'.  

Ensuite affichez les résultats de l'analyse dans la console pour une vérification rapide.  

    \11 exportFile.to_csv('analysisResults.csv')  

    \12 print(exportFile)  

##### Lancer le programme

Il y a plusieurs manières de lancer notre programme et d'obtenir le rapport attendu.  
<br/>  
  
Pour les utilisateurs de Linux et Mac, la façon la plus simple est de créer un nouveau terminal sous Jupyter.  
  
Pour les utilisateur de Windows, puisque le terminal n'est [pas supporté](https://github.com/jupyter/notebook/issues/172) lancez le programme [en dehors de Jupyter.](http://pythoncentral.io/execute-python-script-file-shell/)  
<br/>
  
Dans le terminal de Jupyter, naviguez jusqu'au dossier contenant votre programme - Dans mon cas `/Desktop/Semantic Analysis Program`.  
<br/>  
  
Exécutez le programme avec la commande `python3`.  

    $ cd ~/Desktop/Semantic Analysis Program  

    $ python3 semanticAnalysis.py  

Vérifiez les résultats dans la console et que le fichier 'analysisResults.csv' a été correctement créé.
![alt text](../../../images/20160909-jupyter2.png "Jupyter Terminal")
<br/>  
 
Comme vous pouvez le voir, il n'a fallût que quelques secondes pour analysez le fichier et sortir un rapport clair au lieu de quelques minutes/heures sous Excel.  
<br/>  
  
Vous pouvez donc consacrer plus de temps à des tâches à plus de valeur ajoutée comme utiliser des outils de visualization pour trouver des présentez les résultats.
