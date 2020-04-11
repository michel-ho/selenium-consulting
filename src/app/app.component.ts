import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');
    translate.addLangs(['it', 'fr']);
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
  }
}
