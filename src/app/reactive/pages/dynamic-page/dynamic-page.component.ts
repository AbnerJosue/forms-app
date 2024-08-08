import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm: FormGroup
  public newFavorite: FormControl = new FormControl('', Validators.required ) 

  constructor( private fb: FormBuilder ) {
    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      favoriteGames: this.fb.array([
        ['Metal Gear', Validators.required],
        ['Zelda', Validators.required],
      ])
    })

  } 

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
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


  isValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors 
    && formArray.controls[index].touched;
  }

  onAddToFavorite(): void {
    if( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl(newGame, Validators.required ))
    this.favoriteGames.push( this.fb.control( newGame, Validators.required ) )
    this.newFavorite.reset();

  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }
    console.log( this.myForm.value );
    ( this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array( [ ] )
    this.myForm.reset();
  }

}
