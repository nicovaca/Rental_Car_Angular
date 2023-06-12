import { Component, OnInit } from '@angular/core';
import {Utente} from "../../../models/utente";
import {Router} from "@angular/router";
import {UtentiService} from "../../../services/utenti.service";
import {Ruolo} from "../../../models/ruolo";
import {Stato} from "../../../models/stato";

@Component({
  selector: 'app-form-registrazione',
  templateUrl: './form-registrazione.component.html',
  styleUrls: ['./form-registrazione.component.css']
})
export class FormRegistrazioneComponent implements OnInit{

  utente!:any
  utenti:Utente[] = []

  constructor(
              private utenteService: UtentiService,
              private router: Router) {
  }
  ngOnInit(): void {

      this.utente = {
        id: "",
        nome: '',
        cognome: '',
        dataNascita: new Date(),
        username:'',
        password:'',
        ruolo: Ruolo.CUSTOMER,
        stato: Stato.IN_ATTIVAZIONE,
        prenotazioni: []

    }
  }

  saveUtente(){
      this.utenteService.addUtente(this.utente).subscribe(utente => this.utenti.push(utente))
      this.router.navigate(['login']);
      console.log(this.utente)

  }
}
