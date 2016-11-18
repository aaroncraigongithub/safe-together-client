import Contacts from 'react-native-contacts';

const ContactsManager = {
  getContacts() {
    return new Promise((resolve, reject) => {
      Contacts.getAll((err, contacts) => {
        if(err && err.type === 'permissionDenied'){
          return this.requestPermission().then(ok => {
            if (ok) {
              return this.getContacts();
            } else {
              reject('Permission denied');
            }
          })
        } else {
          resolve(this.packageContacts(contacts));
        }
      })

    });
  },

  requestPermission() {
    return new Promise((resolve) => {
      Contacts.checkPermission((err, permission) => {
        if (permission === 'undefined'){
          Contacts.requestPermission((err, permission) => {
            resolve(permission === 'authorized');
          });
        }
        else if (permission === 'authorized'){
          resolve(true);
        }

        resolve(false);
      });
    });
  },

  packageContacts(contacts) {
    return contacts.filter(
      (contact) => (contact.emailAddresses.length > 0)
    ).map((contact) => (
      {
        name:   this.contactName(contact),
        emails: contact.emailAddresses.map((email) => (email.email)),
        image:  contact.thumbnailPath
      }
    ));
  },

  contactName(contact) {
    const names = [
      contact.givenName,
      contact.middleName,
      contact.familyName
    ];

    return names.filter((name) => (name !== null && name !== '')).join(' ');
  }
};

export default ContactsManager;
