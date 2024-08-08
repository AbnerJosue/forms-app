import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { canBeStrider } from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(private fbs: FormBuilder) {
    this.myForm = this.fbs.group({
      name: ['', [ Validators.required ] ],
      email: ['', [ Validators.required ] ],
      username: ['', [ Validators.required, canBeStrider ] ],
      password: ['', [ Validators.required, Validators.minLength( 6 ) ] ],
      password2: ['', [ Validators.required ] ],
    });
  }

    



  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }



}
