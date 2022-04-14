import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaSalaEsperaComponent } from './ruta-sala-espera.component';

describe('RutaSalaEsperaComponent', () => {
  let component: RutaSalaEsperaComponent;
  let fixture: ComponentFixture<RutaSalaEsperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaSalaEsperaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaSalaEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
