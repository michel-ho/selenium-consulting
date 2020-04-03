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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.idInput = null;
    this.pinInput = null;
  }

  open() {
    this.http.get<Costumer>(Api.COSTUMER + '?pin=' + this.pinInput +'&id='+this.idInput ).subscribe((res) => {
      this.costumer = res[0];
      this.http.get<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG + '?costumerId=' + this.costumer.id).subscribe((resVoranmeldung) => {
        this.voranmeldung = resVoranmeldung[0];
      });
    });
  }

}
