---
id: 20170609
title: A Path to Build an Open-Source Software - Part 1
layout: article.jade
date: 2017-06-09
author: Charles-Henri Decultot
logo: ../../../images/CH-round.png
preview: Overview of the choices we made for the creation of Maia
image: ../../../images/heroImages/20170609-opensourceprojectpart1.jpg
---
Almost one year that we work daily with ERPNext at Dokos. The various adaptations we have made for our clients or for us have given us an excellent knowledge of Frappé, the framework on which ERPNext is built.   

So, when we started to think about developing a software specific to midwifes, we didn't ask ourselves long before choosing the technology to adopt, but had more trouble with the choice of architecture.  

We had several options :  
<br>
**Develop a proprietary application ?**
Of course we could have, but it would have been in contradiction with our philosophy and our way to work with our clients. We really think that our difference is based on the quality of services we provide and we couldn't consider having a different approach with midwifes.     
<br>
**Create an open-source application with another technology ?**
It was an option, but we would have needed to reinvent the wheel. The knowledge developed around ERPNext allows us to propose the best of ERPNext by adapting it specifically to the needs of independent midwifes. Using another technology would have implied to re-develop the billing and accounting parts with almost no added value.  
<br>
**Merge Maia with ERPNext ?**
That is the big question ! Why not merge all of our developments in the source code of ERPNext and benefit from the support of the community to maintain it ? We do it regularly for our clients and encourage them strongly in that way, so why not follow our own advices ?  

As you now know, we have made the choice to keep Maia in an application separated from ERPNext. It is a choice that leads to its share of difficulties because we need to maintain this application with a lot of technical constraints and make sure that it does not break with every update.
However we made this choice for several reasons:  
<br>
  <h6><li> *A question of governance and control over the project* </li></h6>

In the scope of a classic deployment, our clients often ask us to modify existing modules, sometimes to create specific modules. Usually these modifications are not specific to one particular profession and can be reused by other companies in the world.
Only changes that are too specific and/or in contradiction with how ERPNext currently works are not integrated in the source code.  

For Maia, we are in a situation where changes brought to ERPNext are specific only to France and to a very specific activity. To merge them into ERPNext would have required a lot of time and compromises - fully understandable by the way - to make this module more universal than it currently is.

By keeping the application separated from ERPNext, we are in control of our developments, we can send corrections in production faster and can continue to push the application forward by focusing only the needs of french midwifes (for now 😉).
<br>
  <h6><li> *The creation of a specific brand* </li></h6>

The creation of an application separated from ERPNext has allowed us to create a distinct brand that has vocation to serve as a reference for midwifes.

It will surely be subject to discussions, but I am personally convinced that using ERPNext brand would have been more difficult in a market as small as the midwife's where several brands are already well established. The notion of ERPNext does not belong in such a context and it was very important to differentiate Maia from it, especially since Maia only displays a few watered-down features of ERPNext.  

The true difficulty consists indeed in simplifying to maximum the software to simplify the life of midwifes and, in that regard, ERPNext was way too complex.
<br>
  <h6><li> *The ongoing development of a medical module integrated to ERPNext* </li></h6>

During the development phase of Maia, we discovered that a team based in Kerala had developed a medical module and the merge operations had already started.
This module has a huge potential for medical centers and more important health care structures, but it was not adapted to an independent midfiwe activity.
We would have needed to completely change our delivery planning had we considered a merge with this medical module, with a least a few months delay.
<br>
We want in no way take any credit for the work done by the Frappé Team and the ERPNext community and try to mention the presence of ERPNext behind Maia as much as we can. It is common intellectual honesty. However a certain number of elements, technical and commercial, have lead us to create an application separated from ERPNext despite the evident integrations between the two software.  
<br>
If the occasion present itself, we will surely think about integrating the source code of Maia directly into ERPNext, but it will require resources and a huge workload that we prefer to put today in the development of new functionalities and in the stability of Maia.  

<br>
Don't hesitate to check out our demo of [Maia](https://maia-by-dokos.fr).

</br>
---
You need an analysis for your project or advices on this topic ? Don't hesitate to contact me at [DOKOS](https://www.dokos.io), I'll be happy to help you!
