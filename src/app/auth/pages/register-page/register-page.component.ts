import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(private fbs: FormBuilder) {
    this.myForm = this.fbs.group({
      name: ['', [ Validators.required, customValidators.firstNameAndLastnamePattern] ],
      email: ['', [ Validators.required , customValidators.emailPattern ] ],
      username: ['', [ Validators.required, customValidators.canBeStrider ] ],
      password: ['', [ Validators.required, Validators.minLength( 6 ) ] ],
      password2: ['', [ Validators.required ] ],
    });
  }

  isValidField(field: string) { 
    // TODO: obtener validacion de campo
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }


}
