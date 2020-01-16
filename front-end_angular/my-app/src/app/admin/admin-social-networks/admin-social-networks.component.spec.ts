import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSocialNetworksComponent } from './admin-social-networks.component';

describe('AdminSocialNetworksComponent', () => {
  let component: AdminSocialNetworksComponent;
  let fixture: ComponentFixture<AdminSocialNetworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSocialNetworksComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSocialNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
