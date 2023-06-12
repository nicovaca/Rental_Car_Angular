import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError } from 'rxjs';
import { Veicolo } from '../models/veicolo';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class VeicoliService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  //veicoliUrl = 'api/veicoli';  // URL to web api
  veicoliUrl = environment.apiURI + '/api/veicoli'
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


  /** GET veicoli from the server */
  getVeicoli(): Observable<Veicolo[]> {
    return this.http.get<Veicolo[]>(this.veicoliUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVeicoloById(id:number){
    const url = `${this.veicoliUrl}/id/${id}`;
    return this.http.get<Veicolo>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  /** POST: add to the database */
  addVeicolo(veicolo: Veicolo): Observable<Veicolo> {
    return this.http.post<Veicolo>(this.veicoliUrl+'/inserisciModifica', veicolo, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** DELETE: delete from the server */
  deleteVeicolo(id: number): Observable<unknown> {
    const url = `${this.veicoliUrl}/elimina/${id}`; // DELETE api/veicoli
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** PUT: update on the server. Returns the updated upon success. */
  updateVeicolo(veicolo: Veicolo): Observable<any> {
    this.httpOptions.headers =
      this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put(this.veicoliUrl+'/inserisciModifica' , veicolo, this.httpOptions)
     .pipe(
        catchError(this.handleError)

      );
  }



}
