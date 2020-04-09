import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragenComponent } from './fragen.component';

describe('FragenComponent', () => {
  let component: FragenComponent;
  let fixture: ComponentFixture<FragenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
