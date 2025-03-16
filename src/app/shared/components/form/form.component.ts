import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormfiedService } from '../../services/formfied.service';
import { FormField } from '../../interfaces/formfied';
import { CommonModule } from '@angular/common';
import { IonInput, IonSelect, IonLabel, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonSelect,
    IonLabel,
    IonText
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() type: string = 'login';
  @Input() btn_name: string = 'se connecter';
  form: FormGroup;

  constructor(private formfieldservice: FormfiedService) {}

  ngOnInit() {
    this.form = this.formfieldservice.generateForm(this.fields);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}