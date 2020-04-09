import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurzArbeitVoranmeldungListComponent } from './kurz-arbeit-voranmeldung-list.component';

describe('KurzArbeitVoranmeldungListComponent', () => {
  let component: KurzArbeitVoranmeldungListComponent;
  let fixture: ComponentFixture<KurzArbeitVoranmeldungListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurzArbeitVoranmeldungListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurzArbeitVoranmeldungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
