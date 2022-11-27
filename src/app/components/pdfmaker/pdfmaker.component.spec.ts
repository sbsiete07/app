import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfmakerComponent } from './pdfmaker.component';

describe('PdfmakerComponent', () => {
  let component: PdfmakerComponent;
  let fixture: ComponentFixture<PdfmakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfmakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
