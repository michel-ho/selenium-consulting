import { Injectable } from '@angular/core';
import {AbstractApiElement} from '../model/api/AbstractApiElement';
import {HttpClient} from '@angular/common/http';
import {Api} from '../model/Api';

export class GenericService<T extends AbstractApiElement> {

  api: String;
  items: T[];

  constructor(protected http: HttpClient, api: String) {
    console.log("constructor of "+api);
    this.api = api;
    this.load();
  }

  load() {
    return new Promise<T[]>(resolve => {
      this.http.get<T[]>(Api.API + this.api).subscribe(items => {
        this.items = this.map(items);
        resolve(this.items);
      });
    });
  }

  get(id: number) {
    return new Promise<T>(resolve => {
      this.load().then(list => {
        resolve(this.map(this.items.filter(item => item.id === id))[0]);
      });
    });
  }

  update(item: T) {
    return new Promise<T>(resolve => {
      this.http.put<T>(Api.API + this.api + '/' + item.id, item).subscribe(newItem => {
        this.items.filter(i => i.id === newItem.id).forEach(i => i = newItem);

        resolve(newItem);
      });
    });
  }

  add(item: T) {
    return new Promise<T>(resolve => {
      this.http.post<T>(Api.API + this.api, item).subscribe(newItem => {
        this.items = [...this.items, newItem];
        resolve(newItem);
      });
    });
  }

  del(item: T) {
    return new Promise<T>(resolve => {
      this.http.delete<T>(Api.API + this.api + '/' + item.id).subscribe(delItem => {
        this.items = this.items.filter(i => i.id !== delItem.id);
        resolve(delItem);
      });
    });
  }

  map(items: T[]) {
    return items;
  }
}
