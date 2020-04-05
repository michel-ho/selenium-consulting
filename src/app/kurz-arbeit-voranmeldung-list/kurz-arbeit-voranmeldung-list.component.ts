import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Kanton} from '../../../api/kanton';
import {HttpClient} from '@angular/common/http';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Observable} from 'rxjs';
import {Api} from '../../../api/api';
import {Router} from '@angular/router';
import {Costumer} from '../../../api/Costumer';

@Component({
  selector: 'app-kurz-arbeit-voranmeldung-list',
  templateUrl: './kurz-arbeit-voranmeldung-list.component.html',
  styleUrls: ['./kurz-arbeit-voranmeldung-list.component.scss']
})
export class KurzArbeitVoranmeldungListComponent implements OnInit, OnChanges {

  @Input() kanton: Kanton;
  @Input() costumer: Costumer;
  @Input() costumerView = false;
  @Input() asList = true;
  displayedColumns: string[] = ['id', 'arbeitgeber', 'eingangsdatum', 'branche', 'gueltigkeitsBereicht', 'dauerVon', 'dauerBis'];
  voranmeldungen$: Observable<KurzArbeitVoranmeldung>;

  constructor(private http: HttpClient,
              private router: Router,
              ) { }

  ngOnInit() {
    console.log("asList"+this.asList)
    if(this.kanton){
      this.voranmeldungen$ = this.http.get<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?kantonId=' + this.kanton.id);
    }
    if(this.costumer){
      this.voranmeldungen$ = this.http.get<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?costumerId=' + this.costumer.id);
    }
  }

  ngOnChanges(changes: any) {
    if(this.kanton){
      this.voranmeldungen$ = this.http.get<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?kantonId=' + this.kanton.id);
    }
    if(this.costumer){
      this.voranmeldungen$ = this.http.get<KurzArbeitVoranmeldung>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?costumerId=' + this.costumer.id);
    }
  }

  open(voranmeldung: KurzArbeitVoranmeldung) {
    if(this.kanton){
      this.router.navigateByUrl('/anfrage', { state: { voranmeldung: voranmeldung, readonly: false } });
    }
    if(this.costumer){
      this.router.navigateByUrl('/anfrage', { state: { voranmeldung: voranmeldung, readonly: true, costumerView: true } });
    }
  }

  isDoneClass(voranmeldung: KurzArbeitVoranmeldung) {
    if(voranmeldung.status > 3){
      console.log("done")
      return true;
    }
    console.log("not done")
    return false;
  }
  isWaitingClass(voranmeldung: KurzArbeitVoranmeldung) {
    if((this.costumerView && voranmeldung.status==2) ||
       (!this.costumerView && (voranmeldung.status == 3 || voranmeldung.status < 2))){

      console.log("wait")
      return true;
    }

    console.log("not wait")
    return false;
  }

  setAsList(b: boolean) {
    this.asList = b;
  }
}
