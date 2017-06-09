---
id: 20170609
title: Les Étapes de Création d'un Logiciel Open-Source - Partie 1
layout: article.jade
date: 2017-06-09
author: Charles-Henri Decultot
logo: ../../../images/CH-round.png
preview: Petit aperçu des choix que nous avons fait lors du développement de Maia
image: ../../../images/heroImages/20170609-opensourceprojectpart1.jpg
---
Voilà bientôt un an que nous travaillons avec ERPNext au quotidien chez Dokos. Les nombreuses adaptations réalisées pour nos clients ou pour nous, nous ont permis de maîtriser "Frappé", le "framework" sur lequel ERPNext repose.  

Du coup lorsque la question s'est posée de développer un logiciel spécique à l'activité des sages-femmes, la question ne s'est pas posée longtemps avant de choisir la technologie à adopter, par contre le choix du type d'architecture a été plus compliqué.

Nous avions plusieurs options:
<br>
**Développer une application propriétaire ?**
On aurait évidemment pu, mais ça aurait été contraire à notre philosophie et à notre façon de travailler avec nos clients. Nous sommes persuadés que notre différence se fait sur la qualité de service que nous leur apportons et il était hors de question d'envisager une autre approche avec les sages-femmes.
<br>
**Créer une application open-source mais avec une autre technologie ?**
C'était une option, mais il aurait fallu réinventer la roue. La connaissance développée autour d'ERPNext nous permettait d'envisager de proposer le meilleur d'ERPNext en l'adaptant spécifiquement aux besoins des sages-femmes libérales. Utiliser une autre technologie impliquait de devoir reprogrammer toute la partie facturation/comptabilité pour une valeur ajoutée quasi nulle.
<br>
**Intégrer Maia à ERPNext ?**
C'est la grande question ! Pourquoi ne pas intégrer tous nos développements dans le code source d'ERPNext et bénéficier du support de la communauté pour le maintenir ? Nous le faisons régulièrement pour nos clients et nous les incitons fortement à le faire, alors pourquoi ne pas suivre nos propres conseils ?

Comme vous le savez désormais, nous avons fait le choix de garder Maia dans une application séparée d'ERPNext. C'est un choix qui amène son lot de difficultés car nous devons maintenir cette application avec de nombreuses contraintes techniques et nous assurer que chaque mise à jour d'ERPNext ne va pas créer de régressions.
Cependant nous avons fait ce choix pour plusieurs raisons:
<br>
  <h6><li> *Une question de gouvernance et de contrôle sur le projet* </li></h6>

Dans le cadre d'un projet de déploiement classique, nos clients nous demandent souvent de modifier des modules existants, parfois de créer des modules spécifiques. Généralement ces modifications ne sont pas spécifiques à un métier donné et peuvent facilement être réutilisées par d'autres sociétés dans le monde.  
Seuls les changements vraiment trop spécifiques et/ou en contradiction avec la manière dont ERPNext fonctionne actuellement ne sont pas intégrés dans le code source.
<br>
Pour Maia, nous sommes dans un cas de figure où les changements apportés à ERPNext sont spécifiques à la France et à un métier très particulier. Les intégrer à ERPNext aurait nécessité beaucoup de temps et des compromis, tout à fait compréhensibles soit dit en passant, afin de créer un module plus universel qu'il ne l'est actuellement.

En gardant l'application séparée d'ERPNext nous sommes en mesure de contrôler nos développements, d'envoyer des corrections en production plus rapidement et de faire évoluer l'application en prenant en compte uniquement les besoins des sages-femmes françaises (pour le moment 😉 ).
<br>
  <h6><li> *La création d'une marque spécifique* </li></h6>

La création d'une application séparée d'ERPNext nous a permis de créer une marque distincte qui a vocation a servir de référence pour les sages-femmes.

Ce sera sûrement sujet à discussions, mais je suis personnellement persuadé qu'utiliser la marque ERPNext aurait été plus difficile dans un marché aussi petit que celui des sages-femmes dans lequel plusieurs marques sont déjà très bien implantées.
La notion d'ERP n'a pas sa place dans un tel contexte et il était très important de s'en démarquer, d'autant plus que Maia ne présente, dans sa version standard, que quelques fonctionnalités d'ERPNext bien édulcorées.  

La vraie difficulté consiste en effet à simplifier au maximum le logiciel pour faciliter la vie des sages-femmes et, à cet égard, ERPNext était beaucoup trop complexe.
<br>
  <h6><li> *Le développement en cours d'un module médical intégré à ERPNext* </li></h6>

Pendant la phase de développement de Maia, nous avons découvert qu'une équipe du Kerala était en train de développer un module médical et les opérations de fusion avec le code source d'ERPNext sont en cours.
Ce module a un potentiel énorme pour les pôles médicaux et les structures de santé plus importantes, mais n'est pas du tout adapté à une activité de sage-femme libérale.
Le planning de mise en production que nous avions prévu aurait dû être complètement revu si nous avions envisagé une fusion avec ce module médical, avec un décalage du projet de plusieurs mois.

<br>
Nous ne souhaitons en aucun cas nous attribuer le travail fait par l'équipe Frappé et la communauté ERPNext et essayons au maximum de mentionner la présence d'ERPNext derrière Maia. C'est le minimum de l'honneteté intellectuelle. Cependant un certain nombre d'éléments à la fois techniques et commerciaux nous ont poussé à créer une application séparée d'ERPNext malgré les intégrations évidentes entre les deux logiciels.
<br>
Si l'occasion se présente, nous songerons sûrement à intégrer le code source de Maia directement dans celui d'ERPNext, mais cela demandera des ressources et un énorme travail que nous choisissons de mettre aujourd'hui dans le développement de fonctionnalités et dans la stabilité de Maia.

<br>
N'hésitez pas à découvrir notre démo sur le site de [Maia](https://maia-by-dokos.fr).

<br>
---
Vous avez besoin d'une analyse pour un projet ou de conseils sur ce sujet ? N'hésitez pas à me contacter chez [DOKOS](https://www.dokos.io), je serai ravi de vous aider!
