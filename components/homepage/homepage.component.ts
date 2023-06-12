import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  isUserLoggedIn = false;
  ruolo: string = ''
  utenteId!:number

  ngOnInit(): void {
    let storeData = sessionStorage.getItem("isUserLoggedIn");
    let ruolo = sessionStorage.getItem("ruolo");
    let idUtente = sessionStorage.getItem("idUtente");
    console.log("StoreData: " + storeData);

    if (storeData != null && storeData == "true")
      this.isUserLoggedIn = true;
    if (ruolo == 'admin') {
      this.ruolo = ruolo
    } else if (ruolo == 'customer'){
      this.ruolo = ruolo
      this.utenteId = Number(idUtente)
    }
    else
      this.isUserLoggedIn = false;

  }
}
