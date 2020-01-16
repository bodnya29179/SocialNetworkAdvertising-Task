import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLegalUsersComponent } from './admin-legal-users.component';

describe('AdminLegalUsersComponent', () => {
  let component: AdminLegalUsersComponent;
  let fixture: ComponentFixture<AdminLegalUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLegalUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLegalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
