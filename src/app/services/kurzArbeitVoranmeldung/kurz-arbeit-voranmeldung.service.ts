import { Injectable } from '@angular/core';
import {GenericService} from '../generic.service';
import {HttpClient} from '@angular/common/http';
import {Api} from '../../model/Api';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';
import {Costumer} from '../../model/api/Costumer';

@Injectable({
  providedIn: 'root'
})
export class KurzArbeitVoranmeldungService extends GenericService<KurzArbeitVoranmeldung> {

  constructor(protected http: HttpClient) {
    super(http, Api.KURZARBEIT_VORANMELDUNG);
  }

  loadWithCostumerId(id: number) {
    return new Promise<KurzArbeitVoranmeldung[]>(resolve => {
      this.http.get<KurzArbeitVoranmeldung[]>(Api.API + this.api +  '?costumerId=' + id).subscribe(items => {
        this.items = this.map(items);
        resolve(this.items);
      });
    });
  }
  loadWithKantonId(id: number) {
    return new Promise<KurzArbeitVoranmeldung[]>(resolve => {
      this.http.get<KurzArbeitVoranmeldung[]>(Api.API + this.api +  '?kantonId=' + id).subscribe(items => {
        this.items = this.map(items);
        resolve(this.items);
      });
    });
  }

}
