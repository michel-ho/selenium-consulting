import {AfterContentChecked, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Kanton} from '../../../api/kanton';
import {Costumer} from '../../../api/Costumer';
import {Api} from '../../../api/api';
import {HttpClient} from '@angular/common/http';
import {MessageViewComponent} from '../message-view/message-view.component';
import {MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-anfrage-progress',
  templateUrl: './anfrage-progress.component.html',
  styleUrls: ['./anfrage-progress.component.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
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
    if(this.router.getCurrentNavigation() != null && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state) {
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
      if (this.router.getCurrentNavigation().extras.state.costumerView != undefined) {
        this.costumerView = this.router.getCurrentNavigation().extras.state.costumerView;
      }
    }
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const idOfVorhaben = params.get('id');
      if(idOfVorhaben){
        this.http.get<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG + '/' + idOfVorhaben).subscribe(res => {
          this.voranmeldung = res;
          this.readonly = false;
          this.kantonId = this.voranmeldung.kantonId;
          this.costumerView = false;
          this.http.get<Costumer>(Api.COSTUMER + '/' + this.voranmeldung.costumerId).subscribe(res2 => {
            console.log("Costumer")
            console.log(res2)
            this.costumer = res2;
            this.myStepper.selectedIndex = this.voranmeldung.status;
          });
        } );
      }
    }

    );

    if(this.voranmeldung && this.voranmeldung.costumerId){
      this.http.get<Costumer>(Api.COSTUMER + '/' + this.voranmeldung.costumerId).subscribe((res) => {
        console.log("Costumer")
        console.log(res)
        this.costumer = res;
      });
    }
    if(this.voranmeldung){
      this.myStepper.selectedIndex = this.voranmeldung.status;
    }
    console.log(this.myStepper.selectedIndex);
    console.log(this.voranmeldung);
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
    this.save();
    this.http.post("http://www.mhc.li/vv/mail.php", {message:"Neuer Antrag hochgeladen", 'id':this.voranmeldung.id, data:this.voranmeldung}).subscribe(res => console.log(res));
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }

  documentUploadFinished(voranmeldung: KurzArbeitVoranmeldung) {
    this.voranmeldung = voranmeldung;
    this.voranmeldung.status = 2;

    this.http.post("http://www.mhc.li/vv/mail.php", {message:"Antrag Alle Dokumente sind jetzt hochgeladen", 'id':this.voranmeldung.id, data:this.voranmeldung}).subscribe(res => console.log(res));
    this.save();
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }

  newMessage() {
    this.messageView.reload();
  }

  genehmigen() {
    this.voranmeldung.status=4
    this.http.post("http://www.mhc.li/vv/mail.php", {message:"Antrag Genehmigt", 'id':this.voranmeldung.id, data:this.voranmeldung}).subscribe(res => console.log(res));
    this.save();
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }

  zurueckWeisen() {
    this.voranmeldung.status=3;
    this.http.post("http://www.mhc.li/vv/mail.php", {message:"Antrag Zurückgewiesen", 'id':this.voranmeldung.id, data:this.voranmeldung}).subscribe(res => console.log(res));
    this.save();
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }

  save(){
    this.http.put<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG+"/"+this.voranmeldung.id, this.voranmeldung).subscribe(anfrage => {
      this.voranmeldung = anfrage;
    });
  }

  getState() {
    if(this.voranmeldung.status==3){
      return 'abgelent';
    }
    return 'done';
  }
}
