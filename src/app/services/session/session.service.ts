import { Injectable } from '@angular/core';
import {Kanton} from '../../model/api/Kanton';
import {Costumer} from '../../model/api/Costumer';
import {KurzArbeitVoranmeldung} from '../../model/api/KurzArbeitVoranmeldung';
import {Message} from '../../model/api/Message';
import {KurzArbeitVoranmeldungService} from '../kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';
import {Arbeitslosenkasse} from '../../model/api/Arbeitslosenkasse';
import {ArbeitslosenKasseService} from '../arbeitslosenKasse/arbeitslosen-kasse.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService,
    private arbeitslosenKasseService: ArbeitslosenKasseService,
  ) { }

  kanton: Kanton;
  costumerVonVoranmeldung: Costumer;
  costumerVonSession: Costumer;
  kurzArbeitVoranmeldung: KurzArbeitVoranmeldung;
  arbeitslosenkasse: Arbeitslosenkasse[];
  message: Message
  costumerView: boolean;
  gefuehrtesForm: boolean = true;

  updateKurzArbeitVoranmeldung(callback?: Function) {
    this.kurzArbeitVoranmeldungService.update(this.kurzArbeitVoranmeldung).then(item => {
      this.kurzArbeitVoranmeldung = item;
      if (callback) {
        callback.apply(this.kurzArbeitVoranmeldung);
      }
    });
  }

  addKurzArbeitVoranmeldung(callback?: Function) {
    this.kurzArbeitVoranmeldungService.add(this.kurzArbeitVoranmeldung).then(item => {
      this.kurzArbeitVoranmeldung = item;
      if (callback) {
        callback.apply(this.kurzArbeitVoranmeldung);
      }
    });
  }

  setKanton(kanton: Kanton){
    console.log("setKanton:"+kanton)
    this.kanton = kanton;
    this.arbeitslosenKasseService.loadWithKanton(kanton.id).then(list => {
      this.arbeitslosenkasse = list;
    });
  }
}
