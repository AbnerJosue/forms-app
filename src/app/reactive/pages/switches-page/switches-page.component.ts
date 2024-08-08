import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {
  
  public myForm: FormGroup;
  public person = {
    gender: 'F',
    wantNotifications: true,
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      gender: ['M', Validators.required],
      wantNotifications: [true, Validators.required],
      termsAndConditions: [false, Validators.requiredTrue],
    });
  }
  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched ;
  }

  getFieldError( field: string ): string | null {
    
    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'El campo es requerido';
      }  
    }

    return null;

  }
  
  onSave(){
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    } 

    console.log(this.myForm.value);

    const { termsAndConditions,...newPerson } = this.myForm.value;
    this.person = newPerson;

    this.myForm.reset({
      gender: 'M',
    });

  }


}
