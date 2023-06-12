import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


//Pipe
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {NavBarComponent} from './components/template/nav-bar/nav-bar.component';
import {FooterComponent} from './components/template/footer/footer.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {VeicoliComponent} from './components/veicoli/veicoli.component';
import {MyButtonComponent} from './components/template/my-button/my-button.component';
import {MyTableComponent} from './components/template/my-table/my-table.component';
import {FilterPipePipe} from './components/template/my-table/pipe/filter-pipe.pipe';
import {PaginationPipe} from './components/template/my-table/pipe/pagination.pipe';
import {SortPipePipe} from './components/template/my-table/pipe/sort-pipe.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormVeicoloComponent} from './components/forms/form-veicolo/form-veicolo.component';
import {FormUtenteComponent} from './components/forms/form-utente/form-utente.component';
import {UtentiComponent} from './components/utenti/utenti.component';
import {PrenotazioniComponent} from './components/prenotazioni/prenotazioni.component';
import {FormPrenotazioneComponent} from './components/forms/form-prenotazione/form-prenotazione.component';
import {FormLoginComponent} from './components/forms/form-login/form-login.component';
import {PageNotFoundComponent} from './components/template/page-not-found/page-not-found.component';
import {ProfiloCustomerComponent} from './components/profilo-customer/profilo-customer.component';
import {RouteGuardService} from "./services/route-guard.service";
import {LogoutComponent} from './components/forms/logout/logout.component';
import {AuthInterceptor} from "./interceptors/auth-interceptor";
import {Ruolo} from "./models/ruolo";
import { FormRegistrazioneComponent } from './components/forms/form-registrazione/form-registrazione.component';
import { UtentiInattiviComponent } from './components/utenti/utenti-inattivi/utenti-inattivi.component';


@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    MyTableComponent,
    FilterPipePipe,
    SortPipePipe,
    PaginationPipe,
    FormUtenteComponent,
    NavBarComponent,
    FooterComponent,
    HomepageComponent,
    VeicoliComponent,
    FormVeicoloComponent,
    UtentiComponent,
    PrenotazioniComponent,
    FormPrenotazioneComponent,
    FormLoginComponent,
    PageNotFoundComponent,
    ProfiloCustomerComponent,
    LogoutComponent,
    FormRegistrazioneComponent,
    UtentiInattiviComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataServiceService),
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'veicoli', component: VeicoliComponent},
      { path: 'veicoli/:id', component: FormVeicoloComponent,canActivate: [RouteGuardService],data : { role : 'superuser'}},
      { path: 'utenti', component: UtentiComponent,canActivate: [RouteGuardService],data : { role : 'superuser'}},
      { path: 'utenti/inattivi', component: UtentiInattiviComponent,canActivate: [RouteGuardService],data : { role : 'superuser'}},
      { path: 'utenti/:id', component: FormUtenteComponent,canActivate: [RouteGuardService],data : { role : 'superuser'}},
      { path: 'prenotazioni', component: PrenotazioniComponent, canActivate: [RouteGuardService],data : { role : 'superuser'}},
      { path: 'prenotazioni/prenotazioniCustomer/:id/:idUtente', component: FormPrenotazioneComponent,canActivate: [RouteGuardService],data : { role : ['customer','superuser']}},
      { path: 'login', component: FormLoginComponent},
      { path:'logout', component: LogoutComponent},
      { path: 'prenotazioni/prenotazioniCustomer/:id', component: ProfiloCustomerComponent,canActivate: [RouteGuardService],data : { role : 'customer'} },
      { path:'registrazione', component: FormRegistrazioneComponent},

      { path: '', component: HomepageComponent, pathMatch:'full'},
      { path: '**', component: PageNotFoundComponent },
    ])
  ],
  providers: [RouteGuardService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
