import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrechnungsformComponent } from './abrechnungsform.component';

describe('AbrechnungsformComponent', () => {
  let component: AbrechnungsformComponent;
  let fixture: ComponentFixture<AbrechnungsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrechnungsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrechnungsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
