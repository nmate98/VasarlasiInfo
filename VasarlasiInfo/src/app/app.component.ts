import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { EmailMegValidator, TelValidator, AdoszamValidator } from './validator/validator'
import { MatDialog } from '@angular/material/dialog'
import { MegerositDialogComponent } from './megerosit-dialog/megerosit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar'
import { VarosokService } from './service/varosok.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;

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
    return this.form.get('opcionalis.szamlazasinev')
  }
  get adoszam() {
    return this.form.get('opcionalis.adoszam')
  }


  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailMeg: ['', Validators.required],
      vezeteknev: ['', [Validators.required, Validators.minLength(2)]],
      keresztnev: ['', [Validators.required, Validators.minLength(3)]],
      telefonszam: ['', [Validators.required, TelValidator]],
      orszag: [null, Validators.required],
      iranyitoszam: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      varos: ['', Validators.required],
      elter: [false],
      opcionalis: this.fb.group({
        szamlazasinev: [null],
        adoszam: [null]
      })
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
        const szamlazasinev = this.form.get("opcionalis.szamlazasinev");
        const adoszam = this.form.get("opcionalis.adoszam")
        if (val) {
          szamlazasinev.setValidators([Validators.required, Validators.minLength(5)]);
          adoszam.setValidators([Validators.required, AdoszamValidator])
        }
        else {
          szamlazasinev.clearValidators();
          adoszam.clearValidators();
          this.form.patchValue({ opcionalis: { szamlazasinev: null, adoszam: null } })
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
          this.snackBar.open("Adatok elmentve", "OK", { duration: 2000 })
        }
        dialogRef.close();
      })
    }
    else {
      Object.keys(this.form.controls).forEach(field => {
        if (field !== "opcionalis") {
          const control = this.form.get(field);
          control.markAsTouched({ onlySelf: true });
        }
        else {
          if (this.form.get("elter").value) {
            Object.keys((<FormGroup>this.form.get("opcionalis")).controls).forEach(field => {
              const control = this.form.get("opcionalis").get(field);
              control.markAsTouched({ onlySelf: true });
            });
          }
        }
      })
    }
  }
}
