import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfrageProgressComponent } from './anfrage-progress.component';

describe('CostumerProgressComponent', () => {
  let component: AnfrageProgressComponent;
  let fixture: ComponentFixture<AnfrageProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnfrageProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnfrageProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
