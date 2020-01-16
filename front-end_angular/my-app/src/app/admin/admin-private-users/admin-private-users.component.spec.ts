import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrivateUsersComponent } from './admin-private-users.component';

describe('AdminPrivateUsersComponent', () => {
  let component: AdminPrivateUsersComponent;
  let fixture: ComponentFixture<AdminPrivateUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPrivateUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrivateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
