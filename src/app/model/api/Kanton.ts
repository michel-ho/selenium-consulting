import {AbstractApiElement} from './AbstractApiElement';

export class Kanton extends AbstractApiElement {
  id: number = null;
  name: string = null;
  nameKurz: string = null;
  amtsstelle: string = null;
  wappen: string = null;

  static getApi() {
    return '';
  }
}

