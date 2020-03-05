import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.sass']
})
export class ContactCreateComponent implements OnInit {

  contact: Contact;
  contactForm: FormGroup;

  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
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

  onSubmit() {
    if (this.contactForm.valid) {
      const newContact: Contact = {
        ...this.contactForm.value
      };
      this.contactService.addContact(newContact).then ((result) => {
        this.router.navigate(['']); // hace que se vaya a home despues de agregar contacto
      });
    } else {
      console.log('Favor de llenar todos los espacios');
    }
  }
}
