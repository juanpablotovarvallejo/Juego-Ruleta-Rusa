import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaSalaComponent } from './tarjeta-sala.component';

describe('TarjetaSalaComponent', () => {
  let component: TarjetaSalaComponent;
  let fixture: ComponentFixture<TarjetaSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
