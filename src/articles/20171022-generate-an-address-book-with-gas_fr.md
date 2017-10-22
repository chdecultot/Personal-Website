---
id: 20171022
title: Générez un annuaire papier à partir de vos contacts Gmail.
layout: article.jade
date: 2017-10-22
author: Charles-Henri Decultot
logo: ../../../images/CH-round.png
preview: Un script Google Apps pour générer un annuaire à partir de votre liste de contacts Gmail.
image: ../../../images/heroImages/20171022-generate-an-address-book-with-gas.jpg
---
Dans le monde digital dans lequel nous vivons, il n'y a peut-être aucune raison d'utiliser encore un annuaire papier. Sauf si, par examplen vous avez une organisation centralisée qui garde toutes les informations de ses membres dans un compte Gmail mais souhaite pouvoir les partager avec ceux-ci.  

J'ai développé l'outil ci-dessous pour une association qui avait besoin de générer un annuaire papier pour ses membres de manière pratique et régulière.  
N'hésitez pas à réutiliser le code ci-dessous et à l'améliorer selon vos besoins (licence MIT).  
<br>

**Comment ça fonctionne ?**

Copiez simplement le code ci-dessous dans un nouveau script Google lié à un Google Doc.  
<br>

L'exécution du script va générer un nouvel annuaire, correctement formaté avec une image de couverture, dans un nouveau Google Doc.  
Vous pouvez ensuite le partager tel quel, l'envoyer par email ou l'exporter en PDF.  
<br>
![Annuaire](../../../images/articles/20171022-address_book.png)
<br>
**Le code à ajouter à votre Google Doc**

Le code est divisé en deux parties (il pourrait être encore divisé davantage pour une meilleure lecture).  
Attention, pensez bien à modifier la variable permettant de filtrer les groupes de contacts à imprimer.  
<br>
Pour l'ajouter à votre Google Drive, créez un nouveau Google Doc et allez dans "Outils > Éditeur de Script".  
Remplacez le code présent dans "Code.gs" avec le code ci-dessous.  


Retournez dans votre Google Doc, rafraichissez la page et lancez le script pour générer un nouvel annuaire.  
Autorisez l'application à accéder aux données de vos contacts et à votre Drive pour que le script puisse fonctionner.  

```javascript
// Addition of a menu in your Google Doc
function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Address Book')
      .addItem('Generate an Address Book', 'createAddressBook')
      .addToUi();
}


// Function to generate a new address book
function createAddressBook() {
  // The script gets the first image available in the Google Doc. It will be used as cover for the address book.
  var image = DocumentApp.getActiveDocument().getBody().getImages()[0].getBlob();
  // A new Doc is created with a name like "My Address Book_22/10/2018"
  var doc = DocumentApp.create('My Address Book_'  +  Utilities.formatDate(new Date(), 'GMT+2', 'dd/MM/yyyy'));
  var body = doc.getBody();
  var textBody = body.editAsText();

  // The styles that will be applied to different paragraphs
  var style = {};
  style[DocumentApp.Attribute.FONT_SIZE] = 12;
  style[DocumentApp.Attribute.BOLD] = false;

  var jobStyle = {};
  jobStyle[DocumentApp.Attribute.FONT_SIZE] = 12;
  jobStyle[DocumentApp.Attribute.BOLD] = false;
  jobStyle[DocumentApp.Attribute.ITALIC] = true;

  // The script gets the account's contacts
  var contacts = ContactsApp.getContacts();


  // The image fetched before is inserted as a cover picture in the address book
  var imgParStyle = {};
  imgParStyle[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  imgPar = body.appendParagraph("").setAttributes(imgParStyle);
  insertedImage = imgPar.insertInlineImage(0, image);

  // The date of issuance is printed at the top of the address book
  issuanceDate = body.appendParagraph("Address Book Generated The " +  Utilities.formatDate(new Date(), 'GMT+2', 'dd/MM/yyyy'));
  var dateParStyle = {};
  dateParStyle[DocumentApp.Attribute.FOREGROUND_COLOR] = '#1c4587'
  issuanceDate.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  issuanceDate.setAttributes(dateParStyle);

  // For each contact in the account's contact, different elements are fetched and printed in the address book
  for (var i in contacts) {

    // Only contacts belonging to a certain group are printed. This part can be removed if all contacts should be printed or modified if contacts belonging to certain groups only should be printed.
    groups = contacts[i].getContactGroups();

    // Only contacts belonging to the group "Group A" will be printed in the address book.
    for (var j in groups) {
      if (groups[j].getName() === "Group A") {

        // The full name will be printed at the top of the paragrah
        var fullName = contacts[i].getFullName();
        if (fullName.length === 0) {
          continue;
        }
        var paragraph = body.appendParagraph("\n"+fullName);
        paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING2);

        // Only the first address is printed
        var addresses = contacts[i].getAddresses();
        if (addresses.length !== 0) {
          var address = paragraph.appendText("\n"+addresses[0].getAddress());
          address.setAttributes(style);  
        }

        // All phone numbers are printed
        var phones = contacts[i].getPhones();
        if (phones.length !== 0) {
          for (var k in phones) {
            var phone = paragraph.appendText("\n"+phones[k].getPhoneNumber());
            phone.setAttributes(style);
          }
        }

        // The first email address is printed
        var emails = contacts[i].getEmails();
        if (emails.length !== 0) {
          var email = paragraph.appendText("\n"+emails[0].getAddress());
          email.setAttributes(style);
        }

        // The first job title is printed in italic at the bottom of the paragraph
        var companies = contacts[i].getCompanies();
        if (companies.length !== 0) {
          var job = paragraph.appendText("\n"+companies[0].getJobTitle());
          job.setAttributes(jobStyle);
        }
      }
    }
  }
   // When the script is fully executed, the below message is printed
   DocumentApp.getUi().alert('Your address book is available in the root folder of your Google Drive')
}
```

</br>
---
Vous avez besoin d'une analyse pour un projet ou de conseils sur ce sujet ? N'hésitez pas à me contacter chez [DOKOS](https://www.dokos.io), je serai ravi de vous aider!
