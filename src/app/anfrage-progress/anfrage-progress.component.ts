import {AfterContentChecked, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Kanton} from '../../../api/kanton';
import {Costumer} from '../../../api/Costumer';
import {Api} from '../../../api/api';
import {HttpClient} from '@angular/common/http';
import {MessageViewComponent} from '../message-view/message-view.component';

@Component({
  selector: 'app-anfrage-progress',
  templateUrl: './anfrage-progress.component.html',
  styleUrls: ['./anfrage-progress.component.scss']
})
export class AnfrageProgressComponent implements OnInit, AfterContentChecked {

  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild('messageView') private messageView: MessageViewComponent;

  @Input()
  readonly: Boolean = true;

  @Input()
  costumerView: Boolean = false;

  @Input()
  voranmeldung: KurzArbeitVoranmeldung;

  kantonId: number;

  costumer: Costumer;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    if(this.router.getCurrentNavigation() != null) {
      console.log(this.router.getCurrentNavigation());
      if (this.router.getCurrentNavigation().extras.state.voranmeldung) {
        this.voranmeldung = this.router.getCurrentNavigation().extras.state.voranmeldung;
      }
      if (this.router.getCurrentNavigation().extras.state.readonly != undefined) {
        this.readonly = this.router.getCurrentNavigation().extras.state.readonly;
      }
      if (this.router.getCurrentNavigation().extras.state.kantonId != undefined) {
        this.kantonId = this.router.getCurrentNavigation().extras.state.kantonId;
      }
    }
  }


  ngOnInit() {
    console.log("adfjhasdf")
    console.log(this.voranmeldung);
    if(this.voranmeldung.costumerId){
      this.http.get<Costumer>(Api.COSTUMER + '/' + this.voranmeldung.costumerId).subscribe((res) => {
        console.log(res)
        this.costumer = res;
      });
    }
    if(this.costumerView == true){
      this.myStepper.selectedIndex = this.voranmeldung.status -1;
    } else {
      this.myStepper.selectedIndex = this.voranmeldung.status;
    }
  }

  ngAfterContentChecked(){
    document.querySelectorAll<HTMLElement>('.mat-step-icon-state-edit').forEach(ele => {
      ele.parentElement.classList.add("doneStep");
    });
    document.querySelectorAll<HTMLElement>('.mat-step-icon-state-done').forEach(ele => {
      ele.parentElement.classList.add("doneStep");
    });
  }

  formFinished({voranmeldung, costumer}) {
    this.costumer = costumer;
    this.voranmeldung = voranmeldung;
    this.voranmeldung.status = 1;
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }

  documentUploadFinished(voranmeldung: KurzArbeitVoranmeldung) {
    this.voranmeldung = voranmeldung;
    this.voranmeldung.status = 2;
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }

  newMessage() {
    this.messageView.reload();
  }
}
