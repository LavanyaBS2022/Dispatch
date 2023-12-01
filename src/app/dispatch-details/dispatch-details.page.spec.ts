import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispatchDetailsPage } from './dispatch-details.page';

describe('DispatchDetailsPage', () => {
  let component: DispatchDetailsPage;
  let fixture: ComponentFixture<DispatchDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DispatchDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
