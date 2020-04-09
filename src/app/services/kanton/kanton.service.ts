import { Injectable } from '@angular/core';
import {Kanton} from '../../model/api/Kanton';
import {HttpClient} from '@angular/common/http';
import {Api} from '../../model/Api';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';
import {GenericService} from '../generic.service';
import {SessionService} from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class KantonService extends GenericService<Kanton> {

  constructor(protected http: HttpClient,
              private session: SessionService,) {
    super(http, Api.KANTON);
  }

}
