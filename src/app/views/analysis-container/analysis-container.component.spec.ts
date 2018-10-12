import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisContainerComponent } from './analysis-container.component';

describe('AnalysisContainerComponent', () => {
  let component: AnalysisContainerComponent;
  let fixture: ComponentFixture<AnalysisContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
