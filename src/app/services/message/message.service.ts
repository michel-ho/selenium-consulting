import { Injectable } from '@angular/core';
import {GenericService} from '../generic.service';
import {HttpClient} from '@angular/common/http';
import {Api} from '../../model/Api';
import {Message} from '../../model/api/Message';
import {Kanton} from '../../model/api/Kanton';
import {Arbeitslosenkasse} from '../../model/api/Arbeitslosenkasse';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends GenericService<Message> {

  constructor(protected http: HttpClient) {
    super(http, Api.MESSAGE);
  }

  loadWithKurzarbeitVoranmeldung(id: number) {
    return new Promise<Message[]>(resolve => {
      this.http.get<Message[]>(Api.API + this.api + '?voranmeldungId=' + id).subscribe(items => {
        this.items = this.map(items);
        resolve(this.items);
      });
    });
  }

}
