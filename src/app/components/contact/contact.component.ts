import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    // Here you would typically send the form data to a server
    console.log('Form submitted', this.formData);
    // You can add code here to send an email or make an API call
    // After submission, you might want to reset the form or show a success message
    this.formData = { name: '', email: '', subject: '', message: '' };
  }
}
