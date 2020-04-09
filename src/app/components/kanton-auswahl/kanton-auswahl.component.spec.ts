import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KantonAuswahlComponent } from './kanton-auswahl.component';

describe('KantonAuswahlComponent', () => {
  let component: KantonAuswahlComponent;
  let fixture: ComponentFixture<KantonAuswahlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KantonAuswahlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KantonAuswahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
