import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistik} from '../../model/Statistik';
import {Kanton} from '../../model/api/Kanton';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';
import {Api} from '../../model/Api';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {KantonService} from '../../services/kanton/kanton.service';
import {KurzArbeitVoranmeldungService} from '../../services/kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  public stats:Statistik[] = [];


  constructor(private http: HttpClient,
              private kantonService: KantonService,
              private kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService,
              private router: Router) {
    this.kantonService.load();
    this.kurzArbeitVoranmeldungService.load();
  }

  ngOnInit() {
    this.stats.push(new Statistik(0, 'SCHWEIZ'));
    for (let k of this.kantonService.items) {
      this.stats.push(new Statistik(k.id, k.name));
    }
    for (let k of this.kurzArbeitVoranmeldungService.items) {
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
