import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.sass']
})
export class ContactDetailComponent implements OnInit {

contact: Contact;
contactForm: FormGroup;
contacts: Contact[];

  constructor(private activatedRoute: ActivatedRoute,
              private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
    $('.materialboxed').materialbox();
    const id = this.activatedRoute.snapshot.paramMap.get('contactId');
    this.getContact(id);
    this.initForm();
  }

  initForm() {
    this.contactForm = new FormGroup( {
      id: new FormControl(null, [Validators.required]),
      name: new FormControl (null, [Validators.required]),
      cellphone: new FormControl(null, [Validators.required]),
      email: new FormControl (null, [Validators.required]),
    });
  }

  patchForm() {
    this.contactForm.patchValue({
      ...this.contact
    });
  }

  getContact(contactId: string) {
    this.contactService.getContact(contactId).then ((contact: Contact) => {
      this.contact = contact;
      this.patchForm();
    }).catch((error) => {
      this.router.navigate(['contacts', ':contactId']);
    });
  }

  getContacts() {
    this.contactService.getContacts().then((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).then((result) => {
      this.getContacts();
  }).catch((error) => {
    console.log(error);
  });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const updateContact: Contact = {
        id: this.contact.id,
        ...this.contactForm.value
      };
      this.contactService.updateContact(this.contact.id, updateContact).then((res) => {
        this.router.navigate(['contacts', ':contactId']);
      }).catch((error) => {
        alert('Ocurrió un error al actulizar tu contact. Vuelvelo a intentar.');
      });
    } else {
      alert('Tu forma no está completa.');
    }
  }

}
