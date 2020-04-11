import {MatPaginatorIntl} from '@angular/material';
import {Injectable, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Injectable()
export class PaginationKurzarbeit extends MatPaginatorIntl{
  constructor(private translate: TranslateService) {
    super();
    this.getAndInitTranslations();
  }


  getAndInitTranslations() {

    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        console.log('change Language')
        console.log(this.translate.instant('kurzarbeitVoranmeldungListe.tabelle.anzahl'))
        this.itemsPerPageLabel = this.translate.instant('kurzarbeitVoranmeldungListe.tabelle.anzahl');
      });
    this.itemsPerPageLabel = this.translate.instant('kurzarbeitVoranmeldungListe.tabelle.anzahl');
    this.nextPageLabel = null;
    this.previousPageLabel = null;
    this.changes.next();

  }

  getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}
