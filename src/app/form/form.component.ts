import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Kanton} from '../../../api/kanton';
import {KurzArbeitVoranmeldung} from '../../../api/KurzArbeitVoranmeldung';
import {Api} from '../../../api/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  anfrage$: KurzArbeitVoranmeldung = new KurzArbeitVoranmeldung();
  kanton$: Kanton;

  constructor(private http: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.http.get<Kanton>(Api.KANTON + params.get('kantonId')).subscribe((res) => {
        this.kanton$ = res;
        this.anfrage$.kantonId = this.kanton$.id;
      });
    });
  }

  send() {
    this.http.post(Api.KURZARBEIT_VORANMELDUNG, this.anfrage$).subscribe(
      x => {},
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification'));
  }

}
