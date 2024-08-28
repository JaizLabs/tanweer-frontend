import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMembershipsComponent } from './view-memberships.component';

describe('ViewMembershipsComponent', () => {
  let component: ViewMembershipsComponent;
  let fixture: ComponentFixture<ViewMembershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMembershipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
