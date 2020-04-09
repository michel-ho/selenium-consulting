import { Injectable } from '@angular/core';
import {GenericService} from '../generic.service';
import {HttpClient} from '@angular/common/http';
import {Api} from '../../model/Api';
import {Costumer} from '../../model/api/Costumer';
import {Kanton} from '../../model/api/Kanton';
import {Arbeitslosenkasse} from '../../model/api/Arbeitslosenkasse';

@Injectable({
  providedIn: 'root'
})
export class CostumerService extends GenericService<Costumer> {

  constructor(protected http: HttpClient) {
    super(http, Api.COSTUMER);
  }

  loadWithIdAndPin(id: number, pin: string) {
    return new Promise<Costumer>(resolve => {
      this.http.get<Costumer[]>(Api.API + this.api +  '?pin=' + pin + '&id=' + id).subscribe(items => {
        this.items = this.map(items);
        resolve(this.items[0]);
      });
    });
  }



}
