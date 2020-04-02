import {Component, Input, OnInit} from '@angular/core';
import {Costumer} from '../../../api/Costumer';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  @Input()
  costumer$: Costumer;

  constructor() { }

  ngOnInit() {
  }

}
