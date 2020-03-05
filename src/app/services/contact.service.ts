import { Injectable } from '@angular/core';
import { Contact } from 'src/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact [] = [
    {
      id: '1',
      name: 'Jonathan Sanchez',
      cellphone: '6883263',
      email: 'jonathan.sanchez@gmail.com',
      // tslint:disable-next-line: max-line-length
      photo: 'https://img.favpng.com/18/9/20/clip-art-openclipart-user-profile-facebook-free-content-png-favpng-6qpiFEGCQNDLuwyfp4eELvjNN.jpg'
    },
    {
      id: '2',
      name: 'Jonathan Sanchez',
      cellphone: '6883263',
      email: 'jonathan.sanchez@gmail.com',
      // tslint:disable-next-line: max-line-length
      photo: 'https://img.favpng.com/18/9/20/clip-art-openclipart-user-profile-facebook-free-content-png-favpng-6qpiFEGCQNDLuwyfp4eELvjNN.jpg'
    },
    {
      id: '3',
      name: 'Jonathan Sanchez',
      cellphone: '6883263',
      email: 'jonathan.sanchez@gmail.com',
      // tslint:disable-next-line: max-line-length
      photo: 'https://img.favpng.com/18/9/20/clip-art-openclipart-user-profile-facebook-free-content-png-favpng-6qpiFEGCQNDLuwyfp4eELvjNN.jpg'
    },
    {
      id: '4',
      name: 'Jonathan Sanchez',
      cellphone: '6883263',
      email: 'jonathan.sanchez@gmail.com',
      // tslint:disable-next-line: max-line-length
      photo: 'https://img.favpng.com/18/9/20/clip-art-openclipart-user-profile-facebook-free-content-png-favpng-6qpiFEGCQNDLuwyfp4eELvjNN.jpg'
    }
  ];

  constructor() { }

  getContacts(): Promise<Contact[]> {
    return new Promise ((resolve, reject) => {
      resolve (this.contacts);
    });
  }

  getContact(contactId: string): Promise<Contact> {
    return new Promise ((resolve, reject) => {
      const foundContact = this.contacts.find((contact) => {
        return contact.id === contactId;
      });

      if (foundContact) {
        resolve(foundContact);
      } else {
        reject('Contact not found');
      }
    });
  }

  deleteContact(contactId: string): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      const remainingContacts = this.contacts.filter((contact) => {
        return contact.id !== contactId;
      });

      if (JSON.stringify(remainingContacts) !== JSON.stringify(this.contacts)) {
        this.contacts = remainingContacts;
        resolve (true);
      } else {
        reject (false);
      }
    });
  }

  updateContact(contactId: string, updateContact: Contact): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      const updateContacts = this.contacts.map((contact) => {
        if (contact.id === contactId) {
          const newContact = {
            ...contact,
            ...updateContact
          };
          return newContact;
        }
        return contact;
      });

      if (JSON.stringify(updateContact) !== JSON.stringify(this.contacts)) {
        this.contacts = updateContacts;
        resolve(true);
      } else {
        reject (false);
      }
    });
  }

  addContact(contact: Contact): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.contacts.push(contact);

      resolve(true);
    });
  }
}
