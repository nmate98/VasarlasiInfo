import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarosokService {
  varos = [
    {"iranyitoszam" : 5310, "nev" : "Kisújszállás"},
    {"iranyitoszam" : 4000, "nev" : "Debrecen"},
    {"iranyitoszam" : 1000, "nev" : "Budapest"},
    {"iranyitoszam" : 6700, "nev" : "Szeged"},
    {"iranyitoszam" : 3910, "nev" : "Tokaj"},
    {"iranyitoszam" : 3300, "nev" : "Eger"},
    {"iranyitoszam" : 5000, "nev" : "Szolnok"},
    {"iranyitoszam" : 8600, "nev" : "Siófok"},
    {"iranyitoszam" : 9400, "nev" : "Sopron"},
    {"iranyitoszam" : 7600, "nev" : "Pécs"}
  ]

  constructor() { }

  getVaros(iranyitoszam : number) : String{
    let elem = this.varos.find(element => element.iranyitoszam == iranyitoszam)
    let nev  = elem != null ? elem.nev : ''
    return nev
  }
}
