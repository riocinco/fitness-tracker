import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopDialogComponent } from './stop-dialog.component';

describe('StopDialogComponent', () => {
  let component: StopDialogComponent;
  let fixture: ComponentFixture<StopDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
