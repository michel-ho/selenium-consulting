import {AbstractApiElement} from './AbstractApiElement';

export class Message extends AbstractApiElement {
  id: number = null;
  voranmeldungId: number = null;
  toCostumer: boolean = null;
  date: number = Date.now();
  text: string;
  anhangName: string;
  anhang: string | ArrayBuffer;
  readed: boolean = false;
}

