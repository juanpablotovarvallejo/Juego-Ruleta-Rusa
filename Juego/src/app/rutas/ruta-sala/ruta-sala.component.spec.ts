import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaSalaComponent } from './ruta-sala.component';

describe('RutaSalaComponent', () => {
  let component: RutaSalaComponent;
  let fixture: ComponentFixture<RutaSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
