import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasTableComponent } from './programas-table.component';

describe('ProgramasTableComponent', () => {
  let component: ProgramasTableComponent;
  let fixture: ComponentFixture<ProgramasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
