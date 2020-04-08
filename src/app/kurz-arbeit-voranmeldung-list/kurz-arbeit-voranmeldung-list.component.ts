import {Component, Input, OnInit, OnChanges, ViewChild} from '@angular/core';
import {Kanton} from '../../../api/kanton';
import {HttpClient} from '@angular/common/http';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Observable} from 'rxjs';
import {Api} from '../../../api/api';
import {Router} from '@angular/router';
import {Costumer} from '../../../api/Costumer';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-kurz-arbeit-voranmeldung-list',
  templateUrl: './kurz-arbeit-voranmeldung-list.component.html',
  styleUrls: ['./kurz-arbeit-voranmeldung-list.component.scss']
})
export class KurzArbeitVoranmeldungListComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() kanton: Kanton;
  @Input() costumer: Costumer;
  @Input() costumerView = false;
  @Input() asList = true;
  displayedColumns: string[] = ['id', 'arbeitgeber', 'eingangsdatum', 'branche', 'gueltigkeitsBereicht', 'dauerVon', 'dauerBis'];
  voranmeldungen$: KurzArbeitVoranmeldung[];
  filteredVoranmeldungen$: KurzArbeitVoranmeldung[];
  dataSource: MatTableDataSource<KurzArbeitVoranmeldung> = new MatTableDataSource(this.filteredVoranmeldungen$);
  filterToDone:boolean = false;
  filterToTodo:boolean = false;
  filterToWait:boolean = false;

  constructor(private http: HttpClient,
              private router: Router,
              ) { }

  ngOnInit() {
    if(this.kanton){
      this.http.get<KurzArbeitVoranmeldung[]>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?kantonId=' + this.kanton.id).subscribe(res => {
        this.voranmeldungen$ = res;
        this.applyFilter();
      });
    }
    if(this.costumer){
      this.http.get<KurzArbeitVoranmeldung[]>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?costumerId=' + this.costumer.id).subscribe(res => {
        this.voranmeldungen$ = res;
        this.applyFilter();
      });
    }
  }

  ngOnChanges(changes: any) {
    console.log(this.filterToDone)
    if(this.kanton){
      this.http.get<KurzArbeitVoranmeldung[]>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?kantonId=' + this.kanton.id).subscribe(res => {
        this.voranmeldungen$ = res;
        this.applyFilter();
      });
    }
    if(this.costumer){
      this.http.get<KurzArbeitVoranmeldung[]>(Api.API + Api.KURZARBEIT_VORANMELDUNG + '?costumerId=' + this.costumer.id).subscribe(res => {
        this.voranmeldungen$ = res;
        this.applyFilter();
      });
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
      return true;
    }
    return false;
  }
  isWaitingClass(voranmeldung: KurzArbeitVoranmeldung) {
    if((this.costumerView && voranmeldung.status==2) ||
       (!this.costumerView && (voranmeldung.status == 3 || voranmeldung.status < 2))){
      return true;
    }
    return false;
  }

  setAsList(b: boolean) {
    this.asList = b;
  }

  isDisplayed(voranmeldung: KurzArbeitVoranmeldung) {
    if (!this.filterToDone &&
        !this.filterToTodo &&
        !this.filterToWait) {
      return true;
    }
    if ((this.isDoneClass(voranmeldung) && this.filterToDone) ||
        (this.isWaitingClass(voranmeldung) && this.filterToWait) ||
        (!this.isWaitingClass(voranmeldung) &&!this.isDoneClass(voranmeldung) && this.filterToTodo)) {
      return true;
    }
    return false;
  }

  applyFilter() {
    this.filteredVoranmeldungen$ = this.voranmeldungen$.filter(value => this.isDisplayed(value));
    this.dataSource = new MatTableDataSource(this.filteredVoranmeldungen$);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();
  }

  resetFilter() {
    this.filterToTodo = false;
    this.filterToWait = false;
    this.filterToDone = false;
    this.applyFilter();
  }
}
