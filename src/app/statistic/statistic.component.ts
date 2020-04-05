import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistik} from '../../../api/statistik';
import {Kanton} from '../../../api/kanton';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Api} from '../../../api/api';
import {Router} from '@angular/router';
import data from '../../../db.json';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  statistik$: Observable<Statistik> = this.http.get<Statistik>(Api.STATISTIK);
  selectedStatistik: Statistik = null;

  public statistikData:Statistik[] = data['statistik'];

  public kantone:Kanton[] = data['kanton'];
  public kAV:KurzArbeitVoranmeldung[] = data['kurzArbeitVoranmeldung'];
  public stats:Statistik[];


  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
    for (let k of this.kantone) {
      this.stats = [  ]
    }
    for (let k of this.kAV) {
      //console.log(k.arbeitgeber);
    }
    /*for (let t of this.stats) {
      console.log(t.id);
    }*/
  }
}
