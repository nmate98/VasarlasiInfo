import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegerositDialogComponent } from './megerosit-dialog.component';

describe('MegerositDialogComponent', () => {
  let component: MegerositDialogComponent;
  let fixture: ComponentFixture<MegerositDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegerositDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegerositDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
