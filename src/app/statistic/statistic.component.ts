import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistik} from '../../../api/statistik';
import {Kanton} from '../../../api/kanton';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Api} from '../../../api/api';
import {Router} from '@angular/router';
import data from '../../../db.json';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  public statistikData:Statistik[] = data['statistik'];

  public kantone:Kanton[] = data['kanton'];
  public kAV:KurzArbeitVoranmeldung[] = data['kurzArbeitVoranmeldung'];
  public stats:Statistik[] = [];


  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
    this.stats.push(new Statistik(0, 'SCHWEIZ'));
    for (let k of this.kantone) {
      this.stats.push(new Statistik(k.id, k.name));
    }
    for (let k of this.kAV) {
      //console.log(k.kantonId);
      this.stats.find(x=>x.id == k.kantonId).voranmeldungen++;
      this.stats.find(x=>x.id == 0).voranmeldungen++;
      this.stats.find(x=>x.id == k.kantonId).betroffeneAnzMitarbeiter += k.betroffeneAnzMitarbeiter;
      this.stats.find(x=>x.id == 0).betroffeneAnzMitarbeiter += k.betroffeneAnzMitarbeiter;
      this.stats.find(x=>x.id == k.kantonId).bestandGekuendigt += k.bestandGekuendigt;
      this.stats.find(x=>x.id == 0).bestandGekuendigt += k.bestandGekuendigt;
      const eingangsdatum = formatDate(k.eingangsdatum, 'dd.MM.yyyy', 'en').toString();
      if (!this.stats.find(x=>x.id == k.kantonId).perDay.hasOwnProperty(eingangsdatum)) {
        this.stats.find(x=>x.id == k.kantonId).perDay[eingangsdatum] = 0;
      }
      this.stats.find(x=>x.id == k.kantonId).perDay[eingangsdatum]++;
      if (!this.stats.find(x=>x.id == 0).perDay.hasOwnProperty(eingangsdatum)) {
        this.stats.find(x=>x.id == 0).perDay[eingangsdatum] = 0;
      }
      this.stats.find(x=>x.id == 0).perDay[eingangsdatum]++;
      //formatDate(k.eingangsdatum, 'dd.MM.yyyy', 'en').toString();
    }
  }
}
