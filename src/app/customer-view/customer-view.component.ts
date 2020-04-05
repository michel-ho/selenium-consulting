import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Costumer} from '../../../api/Costumer';
import {Api} from '../../../api/api';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Kanton} from '../../../api/kanton';
import {MessageViewComponent} from '../message-view/message-view.component';
import {KurzArbeitVoranmeldungListComponent} from '../kurz-arbeit-voranmeldung-list/kurz-arbeit-voranmeldung-list.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {


  @ViewChild('voranmeldungList') private voranmeldungList: KurzArbeitVoranmeldungListComponent;

  idInput: number;
  pinInput: string;
  costumer: Costumer;
  voranmeldung: KurzArbeitVoranmeldung;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.idInput = null;
    this.pinInput = null;
  }

  open() {
    this.http.get<Costumer>(Api.API + Api.COSTUMER + '?pin=' + this.pinInput +'&id='+this.idInput ).subscribe((res) => {
      this.costumer = res[0];
      this.http.get<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?costumerId=' + this.costumer.id).subscribe((resVoranmeldung) => {
        this.voranmeldung = resVoranmeldung[0];
      });
    });
  }

  createNewForm() {
    const newVoranmeldung = {... this.voranmeldung};
    newVoranmeldung.id = null;
    newVoranmeldung.asPdf = null;
    newVoranmeldung.pdfName = null;
    newVoranmeldung.status = null;
    newVoranmeldung.eingangsdatum = Date.now();
    this.router.navigateByUrl('/anfrage', { state: { kantonId: newVoranmeldung.kantonId, voranmeldung: newVoranmeldung, readonly:  true } });
  }
}
