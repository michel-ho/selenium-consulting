import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Costumer} from '../../model/api/Costumer';
import {Api} from '../../model/Api';
import {KurzArbeitVoranmeldung, StatusEnum} from '../../model/api/KurzArbeitVoranmeldung';
import {Kanton} from '../../model/api/Kanton';
import {MessageViewComponent} from '../message-view/message-view.component';
import {KurzArbeitVoranmeldungListComponent} from '../kurz-arbeit-voranmeldung-list/kurz-arbeit-voranmeldung-list.component';
import {Router} from '@angular/router';
import {KurzArbeitVoranmeldungService} from '../../services/kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';
import {KantonService} from '../../services/kanton/kanton.service';
import {SessionService} from '../../services/session/session.service';
import {CostumerService} from '../../services/costumer/costumer.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {


  @ViewChild('voranmeldungList') private voranmeldungList: KurzArbeitVoranmeldungListComponent;

  idInput: number;
  pinInput: string;

  constructor(private session: SessionService,
              private router: Router,
              private kantonService: KantonService,
              private costumerService: CostumerService,
              private kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService) { }

  ngOnInit() {
    this.session.costumerView = true;
    this.idInput = null;
    this.pinInput = null;
  }

  open() {

    this.costumerService.loadWithIdAndPin(this.idInput, this.pinInput).then((res) => {
      this.session.costumerVonSession = res;
      this.kurzArbeitVoranmeldungService.loadWithCostumerId(this.session.costumerVonSession.id).then((resVoranmeldung) => {
        this.session.kurzArbeitVoranmeldung = resVoranmeldung[0];
      });
    });
  }

  createNewForm() {
    this.session.kurzArbeitVoranmeldung = {... this.session.kurzArbeitVoranmeldung};
    this.session.kurzArbeitVoranmeldung.id = null;
    this.session.kurzArbeitVoranmeldung.asPdf = null;
    this.session.kurzArbeitVoranmeldung.pdfName = null;
    this.session.kurzArbeitVoranmeldung.status = StatusEnum.FORM;
    this.session.kurzArbeitVoranmeldung.eingangsdatum = Date.now();
    this.kantonService.get(this.session.kurzArbeitVoranmeldung.kantonId).then(res => {
      this.session.setKanton(res);
    });
    this.router.navigateByUrl('/anfrage', { state: {readonly:  true } });
  }
}
