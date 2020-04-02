import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Kanton} from '../../../api/kanton';
import {KurzArbeitVoranmeldung} from '../../../api/kurzArbeitVoranmeldung';
import {Api} from '../../../api/api';
import * as faker from 'faker';
import {Costumer} from '../../../api/Costumer';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {generateKurzArbeitVoranmeldung} from '../../../api/generator';
faker.locale = 'de';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input()
  anfrage$: KurzArbeitVoranmeldung = new KurzArbeitVoranmeldung();

  @Input()
  costumer$: Costumer = new Costumer();

  @Input()
  kantonId: number = null;

  @Input()
  readonly: Boolean = false;

  @Output() getFormCreated = new EventEmitter<{anfrage: KurzArbeitVoranmeldung, costumer: Costumer}>();

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
    if(this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.kantonId){
      this.kantonId = this.router.getCurrentNavigation().extras.state.kantonId;
    }
  }

  ngOnInit() {
    this.http.get<Kanton>(Api.KANTON + '/' + this.kantonId.toString()).subscribe((res) => {
      this.anfrage$.kantonId = res.id;
      this.anfrage$.kantonaleAmtsstelle = res.amtsstelle;
    });
  }

  sendAndCreatePdf() {
    // generateKurzArbeitVoranmeldung(this.http, 1, 'Zürich', 10);
    this.costumer$.pin = faker.random.uuid();
    this.costumer$.name = this.anfrage$.arbeitgeber;
    this.http.post<Costumer>(Api.COSTUMER, this.costumer$).subscribe(
      costumer => {
        this.costumer$ = costumer;
        this.anfrage$.costumerId = this.costumer$.id;
        this.anfrage$.status = 1;
        this.http.post<KurzArbeitVoranmeldung>(Api.KURZARBEIT_VORANMELDUNG, this.anfrage$).subscribe(
          anfrage => {
            this.anfrage$ = anfrage;
            this.createPDF();
          } ,
          err => console.error('Anfrage post fail: ' + err));
      } ,
      err => console.error('Costumer post fail: ' + err));
  }

  public async createPDF() {
    const pages = 2;
    const canvasOption = {scrollX: 0, scrollY: -window.scrollY, allowTaint: true};
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    for (let page = 1; page <= pages; page++) {
      const pagedata = document.getElementById('page'.concat(page.toString()));
      pagedata.style.borderColor = 'white';
      await new Promise((resolve) => {
        html2canvas(pagedata, canvasOption).then((canvas) => {
          if (page > 1) {
            pdf.addPage();
          }
          pagedata.style.borderColor = 'grey';
          const contentDataURL = canvas.toDataURL('image/png');
          pdf.addImage(contentDataURL, 'JPEG', 0, 0, canvas.width * 0.2, canvas.height * 0.2, 'a' + page, 'FAST');
          resolve();
        });
      });
    }
    pdf.save('MYPdf.pdf'); // Generated PDF
    this.getFormCreated.emit({anfrage: this.anfrage$, costumer: this.costumer$});
  }
}
