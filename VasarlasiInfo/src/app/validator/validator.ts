import { AbstractControl } from "@angular/forms";



export function EmailMegValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.get('email')
    const emailMeg = control.get('emailMeg')
    if (emailMeg.value != '' && emailMeg.value != null) {
        return (email && emailMeg && email.value !== emailMeg.value) ? { "helytelen": true } : null
    }
}

export function TelValidator(control: AbstractControl): { [key: string]: any } | null {
    const helytelen = !(/^[0-9]*$/.test(control.value))
    return helytelen ? { 'helytelen': true } : null
}

export function AdoszamValidator(control: AbstractControl): { [key: string]: any } | null {
    const helytelen = !(/^[0-9]{8}-[0-9]-[0-9]{2}$/.test(control.value))
    return control.value != null && helytelen ? { 'helytelen': true } : null
}