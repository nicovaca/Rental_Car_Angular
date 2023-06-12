import { Injectable } from '@angular/core';
import {delay, map, Observable, of, retry, tap} from 'rxjs';
import { Utente } from '../models/utente';
import { UtentiService } from './utenti.service';
import {Token} from "../models/token";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserLoggedIn: boolean = false;
  ruolo:string=''
  utenti:Utente[]=[]
  authURL: string = environment.authServerURI;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',

    })
  };
  constructor(private utenteService : UtentiService,
              private http: HttpClient) { }

  /*login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);

    this.utenteService.getutenti().subscribe(utenti => (this.utenti = utenti));

    if (userName == 'admin' && password == 'admin'){
    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    this.ruolo='admin'
      sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
      sessionStorage.setItem('ruolo', this.ruolo='admin');
      sessionStorage.setItem("token", "Bearer " + this.token);

    }
    /!*else if (this.utenti.find(u => u.username == userName) && this.utenti.find(u => u.password == password) ){
      console.log(this.utenti.filter(u => u.username == userName))
      this.isUserLoggedIn = userName == userName && password == password;
      this.ruolo='customer'
      sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
      sessionStorage.setItem('ruolo', this.ruolo='customer');
      sessionStorage.setItem("token", "Bearer " + this.token);
    }*!/
    else {
      console.log(this.utenti.filter(u => u.username == userName))
      this.isUserLoggedIn = userName == userName && password == password;
      this.ruolo='customer'
      sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
      sessionStorage.setItem('ruolo', this.ruolo='customer');
      sessionStorage.setItem("token", "Bearer " + this.token);


    }

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }*/


  login(username: string, password: string) {
    return this.http.post<Token>(this.authURL, {username: username, password: password}, this.httpOptions).pipe(
      map(data => {
        if (username == 'admin' && password == 'admin'){
          this.isUserLoggedIn = username == 'admin' && password == 'admin';
          this.ruolo='admin'
          sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
          sessionStorage.setItem('ruolo', this.ruolo='admin');
          sessionStorage.setItem("token", "Bearer " + data.token);
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(data.token);
          sessionStorage.setItem("role", decodedToken.ruolo);
        }
        else {
          console.log(this.utenti.filter(u => u.username == username))
          this.isUserLoggedIn = username == username && password == password;
          this.ruolo='customer'
          sessionStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
          sessionStorage.setItem('ruolo', this.ruolo='customer');
          sessionStorage.setItem("token", "Bearer " + data.token);

           const helper = new JwtHelperService();
           const decodedToken = helper.decodeToken(data.token);
           sessionStorage.setItem("idUtente", decodedToken.idUtente)
           sessionStorage.setItem("username", decodedToken.username);
           sessionStorage.setItem("role", decodedToken.ruolo);
        }
      })
    )
  }

  logout(): void {
    //this.isUserLoggedIn = false;
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('isUserLoggedIn');
    sessionStorage.removeItem('ruolo');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userid');
  }

  getToken = (): string => {
    var tokenAuth = sessionStorage.getItem("token")
    return (tokenAuth) ? tokenAuth : "";
  }

  getIdUtente= (): number => {
    var id = sessionStorage.getItem("idUtente")
    return (id) ? Number(id) : 0;
  }

  getRuolo = (): string => {
    var ruolo = sessionStorage.getItem("role")
    return (ruolo) ? ruolo : "";
  }

  isLogged(): boolean {
    let isLogged = sessionStorage.getItem("isUserLoggedIn")
    if (isLogged === "true") {
      return true;
    }
    return false;
  }

}
