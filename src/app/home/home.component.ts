import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Kanton} from '../../../api/kanton';
import {Observable} from 'rxjs';
import {Api} from '../../../api/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Kurzarbeit-Antrag';

  kanton$: Observable<Kanton> = this.http.get<Kanton>(Api.KANTON);
  selectedKanton: Kanton = new Kanton();

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

}
