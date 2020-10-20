import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-megerosit-dialog',
  templateUrl: './megerosit-dialog.component.html',
  styleUrls: ['./megerosit-dialog.component.css']
})
export class MegerositDialogComponent implements OnInit {
  email = ""
  vezeteknev = ""
  keresztnev = ""
  telefonszam = ""
  orszag = ""
  iranyitoszam = ""
  szamlazasinev = ""
  adoszam = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }
  ngOnInit(): void {
    this.email = this.data.control.get("email").value;
    this.vezeteknev = this.data.control.get("vezeteknev").value;
    this.keresztnev = this.data.control.get("keresztnev").value;
    this.telefonszam = this.data.control.get("telefonszam").value;
    this.orszag = this.data.control.get("orszag").value;
    this.iranyitoszam = this.data.control.get("iranyitoszam").value;
    this.szamlazasinev = this.data.control.get("szamlazasinev").value != null ? this.data.control.get("szamlazasinev").value : "";
    this.adoszam = this.data.control.get("adoszam").value != null ? this.data.control.get("adoszam").value : "";
  }
  

}
