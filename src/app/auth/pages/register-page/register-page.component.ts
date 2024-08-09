import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators';
import { EmailValidator } from '../../../shared/validators/email-valiadator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(
    private fbs: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {
      this.myForm = this.fbs.group({
        name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern)] ],
        // email: ['', [ Validators.required , Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator ] ], // Este es peor en performance pero si se usa en mas 
        email: ['', [ Validators.required , Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ] ], // Este es mejor en performance
        username: ['', [ Validators.required, this.validatorsService.canBeStrider ] ],
        password: ['', [ Validators.required, Validators.minLength( 6 ) ] ],
        password2: ['', [ Validators.required ] ],
      },
      {
        validators: [ 
          this.validatorsService.isFieldOneEqualToFieldTwo('password', 'password2')
        ]
      }

    );
  }

  isValidField(field: string) { 
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }


}
