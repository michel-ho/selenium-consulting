import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Kanton} from '../../../api/kanton';
import {Costumer} from '../../../api/Costumer';
import {Api} from '../../../api/api';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-anfrage-progress',
  templateUrl: './anfrage-progress.component.html',
  styleUrls: ['./anfrage-progress.component.scss']
})
export class AnfrageProgressComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;

  @Input()
  readonly: Boolean = true;

  voranmeldung: KurzArbeitVoranmeldung;

  kantonId: number;

  costumer: Costumer;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.voranmeldung = this.router.getCurrentNavigation().extras.state.voranmeldung;
    this.readonly = this.router.getCurrentNavigation().extras.state.readonly;
    this.kantonId = this.router.getCurrentNavigation().extras.state.kantonId;

    if(this.voranmeldung.costumerId){
      this.http.get<Costumer>(Api.COSTUMER + '/' + this.voranmeldung.costumerId).subscribe((res) => {
        console.log(res)
        this.costumer = res;
      });
    }
  }

  ngOnInit() {
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }

  formFinished({anfrage, costumer}) {
    this.voranmeldung.status = 1;
    this.myStepper.selectedIndex = this.voranmeldung.status;
  }
}
