import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaBienvenidoComponent } from './ruta-bienvenido.component';

describe('RutaBienvenidoComponent', () => {
  let component: RutaBienvenidoComponent;
  let fixture: ComponentFixture<RutaBienvenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaBienvenidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaBienvenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
