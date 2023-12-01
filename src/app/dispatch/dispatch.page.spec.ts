import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispatchPage } from './dispatch.page';

describe('DispatchPage', () => {
  let component: DispatchPage;
  let fixture: ComponentFixture<DispatchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DispatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
