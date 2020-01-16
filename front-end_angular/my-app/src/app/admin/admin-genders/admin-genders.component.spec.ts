import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGendersComponent } from './admin-genders.component';

describe('AdminGendersComponent', () => {
  let component: AdminGendersComponent;
  let fixture: ComponentFixture<AdminGendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGendersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
