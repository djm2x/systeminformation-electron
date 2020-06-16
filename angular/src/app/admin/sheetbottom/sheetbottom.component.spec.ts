import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetbottomComponent } from './sheetbottom.component';

describe('SheetbottomComponent', () => {
  let component: SheetbottomComponent;
  let fixture: ComponentFixture<SheetbottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetbottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
