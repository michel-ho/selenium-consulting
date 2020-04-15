import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Kanton} from '../../model/api/Kanton';
import {Observable} from 'rxjs';
import {Api} from '../../model/Api';
import {Router} from '@angular/router';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';
import {generateKurzArbeitVoranmeldung} from '../../model/generator';
import {KantonService} from '../../services/kanton/kanton.service';
import {KurzArbeitVoranmeldungService} from '../../services/kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isNeuerUser = false;
  isBehoerde = false;
  showProtoInfo = true;

  constructor(private session: SessionService,
              private kantonService: KantonService,
              private kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService,
              private router: Router) {}

  ngOnInit() {
  }

  newFormular() {
    this.session.kurzArbeitVoranmeldung = new KurzArbeitVoranmeldung();
    this.router.navigateByUrl('/anfrage', { state: { readonly:  true } });
  }

  behoerde() {
    this.session.costumerView = false;
    this.session.kanton = null;
    this.isBehoerde = true;
  }

  newUser() {
    this.session.costumerView = true;
    this.session.kanton = null;
    this.isNeuerUser = true;
  }

  setSelectedKanton(kanton: Kanton) {
    this.session.setKanton(kanton);
  }

  neuesForm(gefuehrtesForm: boolean) {
    this.session.gefuehrtesForm = gefuehrtesForm;
    this.newFormular();
  }
}
