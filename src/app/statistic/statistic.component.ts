import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistik} from '../../../api/statistik';
import {Api} from '../../../api/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  statistik$: Observable<Statistik> = this.http.get<Statistik>(Api.STATISTIK);
  selectedStatistik: Statistik = null;

  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
  }

}
