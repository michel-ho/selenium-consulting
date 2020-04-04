import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Kanton} from '../../../api/kanton';
import {Observable} from 'rxjs';
import {Api} from '../../../api/api';
import {Router} from '@angular/router';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isNeuerUser = false;
  isBehoerde = false;
  title = 'Kurzarbeit-Antrag';

  kanton$: Observable<Kanton> = this.http.get<Kanton>(Api.KANTON);
  selectedKanton: Kanton = null;
  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
  }

  newFormular() {
    this.router.navigateByUrl('/anfrage', { state: { kantonId: this.selectedKanton.id, voranmeldung: new KurzArbeitVoranmeldung(), readonly:  true } });
  }

  behoerde() {
    this.isBehoerde = true;
  }

  newUser() {
    this.isNeuerUser = true;
  }
}
