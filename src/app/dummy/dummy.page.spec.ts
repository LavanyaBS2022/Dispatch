import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyPage } from './dummy.page';

describe('DummyPage', () => {
  let component: DummyPage;
  let fixture: ComponentFixture<DummyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DummyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
