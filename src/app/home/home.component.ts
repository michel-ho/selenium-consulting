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

  kanton$: Observable<Kanton> = this.http.get<Kanton>(Api.API + Api.KANTON);
  selectedKanton: Kanton = null;
  showProtoInfo = true;
  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
  }

  newFormular() {
    this.router.navigateByUrl('/anfrage', { state: { costumerView:true, kantonId: this.selectedKanton.id, voranmeldung: new KurzArbeitVoranmeldung(), readonly:  true } });
  }

  behoerde() {
    this.isBehoerde = true;
  }

  newUser() {
    this.isNeuerUser = true;
  }

  setSelectedKanton(kanton: Kanton) {
    this.selectedKanton = kanton;
    if(this.isNeuerUser){
      this.newFormular();
    }
  }
}
