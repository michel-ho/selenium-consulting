import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fragen',
  templateUrl: './fragen.component.html',
  styleUrls: ['./fragen.component.scss']
})
export class FragenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clickLink() {
    document.getElementById('helpdesklink').click();
  }
}
