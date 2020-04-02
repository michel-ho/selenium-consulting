import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Kanton} from '../../../api/kanton';
import {HttpClient} from '@angular/common/http';
import {KurzArbeitVoranmeldung} from '../../../api/KurzArbeitVoranmeldung';
import {Observable} from 'rxjs';
import {Api} from '../../../api/api';

@Component({
  selector: 'app-kurz-arbeit-voranmeldung-list',
  templateUrl: './kurz-arbeit-voranmeldung-list.component.html',
  styleUrls: ['./kurz-arbeit-voranmeldung-list.component.scss']
})
export class KurzArbeitVoranmeldungListComponent implements OnInit, OnChanges {

  @Input() kanton: Kanton;
  voranmeldungen$: Observable<KurzArbeitVoranmeldung>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log(this.kanton);
    this.voranmeldungen$ = this.http.get<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG + '?kantonId=' + this.kanton.id);
  }

  ngOnChanges(changes: any) {
    this.voranmeldungen$ = this.http.get<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG + '?kantonId=' + this.kanton.id);
  }

}
