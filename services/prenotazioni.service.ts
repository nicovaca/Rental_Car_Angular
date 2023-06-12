import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError } from 'rxjs';
import { Prenotazione } from '../models/prenotazione';
import {environment} from "../../environments/environment";
import { Response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
 // prenotazioniUrl = 'api/prenotazioni';  // URL to web api
  prenotazioniUrl = environment.apiURI + '/api/prenotazioni'


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  constructor(
    private http: HttpClient,
  ) {}


  /** GET prenotazioni from the server */
  getPrenotazioni(): Observable<Prenotazione[]> {

     return this.http.get<Prenotazione[]>(this.prenotazioniUrl)
      .pipe(
        catchError(this.handleError)
      );

  }

  getPrenotazioneById(id:number){
    const url = `${this.prenotazioniUrl}/id/${id}`;
    return this.http.get<Prenotazione>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  /** POST: add to the database */
  addPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
    return this.http.post<Prenotazione>(this.prenotazioniUrl+'/inserisciModifica', prenotazione, this.httpOptions)
      .pipe(
        map((result: { utente: { id: any; }; }) => result.utente.id),
        catchError(this.handleError)
      );
  }

  /** DELETE: delete from the server */
  deletePrenotazione(id: number): Observable<unknown> {
    const url = `${this.prenotazioniUrl}/elimina/${id}`; // DELETE api/prenotazioni
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** PUT: update on the server. Returns the updated upon success. */
  updatePrenotazione(prenotazione: Prenotazione): Observable<any> {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put(this.prenotazioniUrl+'/inserisciModifica' , prenotazione, this.httpOptions)
      .pipe(
        catchError(this.handleError)

      );
  }

  getPrenotazioniByIdUtente(id:number): Observable<Prenotazione[]>{
    const url = `${this.prenotazioniUrl}/prenotazioniCustomer/${id}`;
    return this.http.get<Prenotazione[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  approvaPrenotazione(id: number): Observable<unknown> {
    const url = `${this.prenotazioniUrl}/approva/${id}`;
    return this.http.put(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
