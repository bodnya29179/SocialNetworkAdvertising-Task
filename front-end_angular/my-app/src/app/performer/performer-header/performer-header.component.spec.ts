import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerHeaderComponent } from './performer-header.component';

describe('PerformerHeaderComponent', () => {
  let component: PerformerHeaderComponent;
  let fixture: ComponentFixture<PerformerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
