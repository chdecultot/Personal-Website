---
id: 20171022
title: Generate an address book from you Gmail Contacts
layout: article.jade
date: 2017-10-22
author: Charles-Henri Decultot
logo: ../../../images/CH-round.png
preview: A google apps script to generate an address book from your Gmail contacts.
image: ../../../images/heroImages/20171022-generate-an-address-book-with-gas.jpg
---
In the digital world we live in there might be no reason to use a paper based address book anymore. Unless, for example, you have a centralized organization that keeps all its members information in a Gmail account and wants to share it with its members.

I have developed the below tool for an association in need of generating an address book for its members.  
Feel free to reuse it and enhance it as you like (MIT licence).
<br>

**How does it work ?**

Just copy the below in a new Google Script linked to a Google Doc.
<br>

The execution of the script will generate a new address book, nicely formated with a cover picture, in a new Google Doc.  
Up to you to share it as is, send it in an email or export it as a PDF.  
<br>
![Address Book Preview](../../../images/articles/20171022-address_book.png)
<br>
**The code to be added in your Google Doc**

The code is split in two parts (could be split further for more clarity).  
Do not forget to change the variable filtering contacts based on their group's assignment and to add a cover picture in your source Google Doc.    
<br>
To add it in your Google Drive, create a new Google Doc and go to "Tools > Script Editor".  
Replace the existing code in "Code.gs" with the below code.  


Go back to your Google Doc, refresh the page and you can launch the script to generate a new address book.
Grant the necessary permissions to your contacts and Drive for the script to be able to work.

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
You need an analysis for your project or advices on this topic ? Don't hesitate to contact me at [DOKOS](https://www.dokos.io), I'll be happy to help you!
