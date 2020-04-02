import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Costumer} from '../../../api/Costumer';
import {Api} from '../../../api/api';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Kanton} from '../../../api/kanton';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  idInput: number;
  pinInput: string;
  costumer: Costumer;
  voranmeldung: KurzArbeitVoranmeldung;
  kanton: Kanton;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  open() {
    this.http.get<Costumer>(Api.COSTUMER + '/pin=' + this.pinInput +'&id='+this.idInput ).subscribe((res) => {
      this.costumer = res;
      this.http.get<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG + '/costumerId=' + this.costumer.id).subscribe((resVoranmeldung) => {
        this.voranmeldung = resVoranmeldung;
        this.http.get<Kanton>(Api.KANTON + '/id=' + this.voranmeldung.kantonId).subscribe((resKanton) => {
          this.kanton = resKanton;
        });
      });
    });
  }

}
