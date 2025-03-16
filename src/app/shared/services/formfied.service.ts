import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../interfaces/formfied';


@Injectable({ providedIn: 'root' })
export class FormfiedService {
  constructor(private fb: FormBuilder) {}

  generateForm(fields: FormField[]): FormGroup {
    const formGroup = this.fb.group({});
    fields.forEach(field => {
      const validators = [];
      // Gestion des validations avec notation en crochets
      if (field.validators?.['required']) validators.push(Validators.required);
      if (field.validators?.['min']) validators.push(Validators.min(field.validators['min']));
      if (field.validators?.['max']) validators.push(Validators.max(field.validators['max']));
      if (field.validators?.['email']) validators.push(Validators.email);
      if (field.validators?.['pattern']) validators.push(Validators.pattern(field.validators['pattern']));

      // Ajouter le champ au formulaire
      formGroup.addControl(field.name, this.fb.control('', validators));
    });
    return formGroup;
  }

}
