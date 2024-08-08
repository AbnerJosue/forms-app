import { FormControl } from "@angular/forms";

export const canBeStrider = ( control: FormControl) => {

    const value = control.value?.trim().toLowerCase();

    if( value === 'strider' ) {
        return {
            noStrider: true
        }
    }

    return null;

}