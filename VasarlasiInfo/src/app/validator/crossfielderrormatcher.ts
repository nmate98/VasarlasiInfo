import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const email = form.form.controls['email']
        const emailMeg = form.form.controls['emailMeg']
        if (email.value != null && emailMeg.value != null) {
            return email.value !== emailMeg.value
        }
    }
}