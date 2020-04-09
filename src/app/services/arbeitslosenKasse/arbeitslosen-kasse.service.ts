import { Injectable } from '@angular/core';
import {GenericService} from '../generic.service';
import {HttpClient} from '@angular/common/http';
import {Api} from '../../model/Api';
import {Arbeitslosenkasse} from '../../model/api/Arbeitslosenkasse';
import {Kanton} from '../../model/api/Kanton';

@Injectable({
  providedIn: 'root'
})
export class ArbeitslosenKasseService extends GenericService<Arbeitslosenkasse> {

  constructor(protected http: HttpClient) {
    super(http, Api.ARBEITSLOSENKASSE);
  }

  loadWithKanton(id: number) {
    return new Promise<Arbeitslosenkasse[]>(resolve => {
      this.http.get<Arbeitslosenkasse[]>(Api.API + this.api + "?kantonId="+id).subscribe(items => {
        this.items = this.map(items);
        resolve(this.items);
      });
    });
  }

}
