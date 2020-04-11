import {AfterContentChecked, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {
  KurzArbeitVoranmeldung,
  kurzArbeitVoranmeldung_is_APPROVED,
  kurzArbeitVoranmeldung_is_DECLINED,
  StatusEnum
} from '../../model/api/KurzArbeitVoranmeldung';
import {Kanton} from '../../model/api/Kanton';
import {Costumer} from '../../model/api/Costumer';
import {Api} from '../../model/Api';
import {HttpClient} from '@angular/common/http';
import {MessageViewComponent} from '../message-view/message-view.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CostumerService} from '../../services/costumer/costumer.service';
import {KantonService} from '../../services/kanton/kanton.service';
import {KurzArbeitVoranmeldungService} from '../../services/kurzArbeitVoranmeldung/kurz-arbeit-voranmeldung.service';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-anfrage-progress',
  templateUrl: './anfrage-progress.component.html',
  styleUrls: ['./anfrage-progress.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class AnfrageProgressComponent implements OnInit, AfterContentChecked {

  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild('messageView') private messageView: MessageViewComponent;

  @Input()
  readonly: Boolean = true;
  initSettedStepper: Boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private session: SessionService,
              private costumerService: CostumerService,
              private kantonService: KantonService,
              private kurzArbeitVoranmeldungService: KurzArbeitVoranmeldungService) {
    if (this.router.getCurrentNavigation() != null &&
        this.router.getCurrentNavigation().extras &&
        this.router.getCurrentNavigation().extras.state) {

      if (this.router.getCurrentNavigation().extras.state.readonly !== undefined) {
        this.readonly = this.router.getCurrentNavigation().extras.state.readonly;
      }
    }
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idOfVorhaben = params.get('id');
      if (idOfVorhaben) {
        this.kurzArbeitVoranmeldungService.get(Number(idOfVorhaben)).then(res => {
          this.session.kurzArbeitVoranmeldung = res;
          this.costumerService.get(this.session.kurzArbeitVoranmeldung.costumerId).then(res => {
            this.session.costumerVonVoranmeldung = res;
          });
          if (!this.session.kanton) {
            this.kantonService.get(this.session.kurzArbeitVoranmeldung.kantonId).then(res => {
              this.session.setKanton(res);
            });
          }
        });
      }
    });
    if (this.session.kurzArbeitVoranmeldung) {
      this.costumerService.get(this.session.kurzArbeitVoranmeldung.costumerId).then(res => {
        this.session.costumerVonVoranmeldung = res;
      });
      if (!this.session.kanton) {
        this.kantonService.get(this.session.kurzArbeitVoranmeldung.kantonId).then(res => {
          this.session.setKanton(res);
        });
      }
    }
    if (this.myStepper) {
      if (this.session.costumerView === true) {
        this.myStepper.selectedIndex = this.session.kurzArbeitVoranmeldung.status.stepIndex;
      } else {
        this.myStepper.selectedIndex = this.session.kurzArbeitVoranmeldung.status.stepIndexOffice;
      }
    }
  }

  ngAfterContentChecked() {
    if (this.myStepper && !this.initSettedStepper) {
      this.initSettedStepper = true;
      if (this.session.costumerView === true) {
        this.myStepper.selectedIndex = this.session.kurzArbeitVoranmeldung.status.stepIndex;
      } else {
        this.myStepper.selectedIndex = this.session.kurzArbeitVoranmeldung.status.stepIndexOffice;
      }
    }

    document.querySelectorAll<HTMLElement>('.mat-step-icon-state-edit').forEach(ele => {
      ele.parentElement.classList.add('doneStep');
    });
    document.querySelectorAll<HTMLElement>('.mat-step-icon-state-done').forEach(ele => {
      ele.parentElement.classList.add('doneStep');
    });
  }

  formFinished({voranmeldung, costumer}) {
    this.session.costumerVonVoranmeldung = costumer;
    this.session.kurzArbeitVoranmeldung.status = StatusEnum.DOCUMENT_UPLOAD;
    this.session.updateKurzArbeitVoranmeldung();
    this.initSettedStepper = false;
  }

  documentUploadFinished(voranmeldung: KurzArbeitVoranmeldung) {
    this.session.kurzArbeitVoranmeldung.status = StatusEnum.CHECK;
    this.session.updateKurzArbeitVoranmeldung();
    this.initSettedStepper = false;
    /*this.http.post('http://www.mhc.li/vv/mail.php', {message: 'Antrag Alle Dokumente sind jetzt hochgeladen', 'id': this.voranmeldung.id, data: this.voranmeldung}).subscribe(res => console.log(res));
    */
  }

  newMessage() {
    this.messageView.reload();
  }

  genehmigen() {
    this.session.kurzArbeitVoranmeldung.status = StatusEnum.APPROVED;
    this.session.updateKurzArbeitVoranmeldung();
    this.initSettedStepper = false;
    /*this.http.post("http://www.mhc.li/vv/mail.php", {message:"Antrag Genehmigt", 'id':this.voranmeldung.id, data:this.voranmeldung}).subscribe(res => console.log(res));
    this.save();
    this.initSettedStepper = false;*/
  }

  zurueckWeisen() {
    this.session.kurzArbeitVoranmeldung.status = StatusEnum.DECLINED;
    this.session.updateKurzArbeitVoranmeldung();
    this.initSettedStepper = false;
    /*this.http.post("http://www.mhc.li/vv/mail.php", {message:"Antrag Zurückgewiesen", 'id':this.voranmeldung.id, data:this.voranmeldung}).subscribe(res => console.log(res));
    this.save();
    this.initSettedStepper = false;*/
  }

  getState() {
    if(kurzArbeitVoranmeldung_is_DECLINED(this.session.kurzArbeitVoranmeldung.status.id)) {
      return 'abgelent';
    }
    return 'done';
  }

  is_APPROVED() {
    kurzArbeitVoranmeldung_is_APPROVED(this.session.kurzArbeitVoranmeldung.status.id);
  }
}
