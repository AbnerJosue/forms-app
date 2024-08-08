import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   price: new FormControl(''),
  //   inStorage: new FormControl(''),
  // });

  public myForm: FormGroup;
 
  constructor(private fbs: FormBuilder) {
    this.myForm = this.fbs.group({
      name: ['', [ Validators.required, Validators.minLength( 3 ) ] ],
      price: [ 0 , [ Validators.required, Validators.min(0) ] ],
      inStorage: [0, [ Validators.required, Validators.min(0) ]],
    });
  }

  ngOnInit(): void {
    // this.myForm.reset({ name: '', price: 0,inStorage: 0 });
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
          return 'This field is required';
        case 'minlength':
          return ` Min length ${ errors['minlength'].requiredLength }`;
        case 'min':
          return ` Min value ${ errors['min'].min }`;
      }  
    }

    return null;

  }

  onSave():void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0
    })
  }
 
}
