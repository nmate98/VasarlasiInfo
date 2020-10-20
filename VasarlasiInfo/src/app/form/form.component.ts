import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms'
import { EmailMegValidator, TelValidator, AdoszamValidator } from '../validator/validator'
import { MatDialog } from '@angular/material/dialog'
import { MegerositDialogComponent } from '../megerosit-dialog/megerosit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar'
import { VarosokService } from '../service/varosok.service'
import { CrossFieldErrorMatcher } from '../validator/crossfielderrormatcher';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private varosokservice: VarosokService) { }

  get email() {
    return this.form.get('email')
  }
  get emailMeg() {
    return this.form.get('emailMeg')
  }
  get vezeteknev() {
    return this.form.get('vezeteknev')
  }
  get keresztnev() {
    return this.form.get('keresztnev')
  }
  get orszag() {
    return this.form.get('orszag')
  }
  get iranyitoszam() {
    return this.form.get('iranyitoszam')
  }
  get varos() {
    return this.form.get('varos')
  }
  get telefonszam() {
    return this.form.get('telefonszam')
  }
  get szamlazasinev() {
    return this.form.get('szamlazasinev')
  }
  get adoszam() {
    return this.form.get('adoszam')
  }


  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      emailMeg: [null, Validators.required],
      vezeteknev: [null, [Validators.required, Validators.minLength(2)]],
      keresztnev: [null, [Validators.required, Validators.minLength(3)]],
      telefonszam: [null, [Validators.required, TelValidator]],
      orszag: [null, Validators.required],
      iranyitoszam: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      varos: [null, Validators.required],
      elter: [false],
      szamlazasinev: [null],
      adoszam: [null]
    }, { validator: EmailMegValidator });
    this.iranyitoszam.valueChanges.subscribe(
      val => {
        if (this.iranyitoszam.valid) {
          let nev = this.varosokservice.getVaros(val)
          this.varos.setValue(nev)
        }
      }
    )
    this.form.get("elter").valueChanges.subscribe(
      val => {
        if (val) {
          this.szamlazasinev.setValidators([Validators.required, Validators.minLength(5)]);
          this.adoszam.setValidators([Validators.required, AdoszamValidator])
        }
        else {
          this.szamlazasinev.markAsPristine();
          this.adoszam.markAsPristine();
          this.szamlazasinev.markAsUntouched();
          this.adoszam.markAsUntouched();
          this.szamlazasinev.clearValidators();
          this.adoszam.clearValidators();
          this.form.patchValue({ szamlazasinev: null, adoszam: null })
        }
      })
  }
  openDialog() {
    let dialogRef = null
    if (this.form.valid) {
      dialogRef = this.dialog.open(MegerositDialogComponent, { data: { control: this.form } })
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result == "kesz") {
          console.log(this.form.value)
          this.form.reset();
          this.snackBar.open("Adatok elmentve", "OK", { duration: 4000 })
        }
        dialogRef.close();
      })
    }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    }
  }
}
