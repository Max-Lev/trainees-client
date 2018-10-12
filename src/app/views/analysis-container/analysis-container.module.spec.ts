import { AnalysisContainerModule } from './analysis-container.module';

describe('AnalysisContainerModule', () => {
  let analysisContainerModule: AnalysisContainerModule;

  beforeEach(() => {
    analysisContainerModule = new AnalysisContainerModule();
  });

  it('should create an instance', () => {
    expect(analysisContainerModule).toBeTruthy();
  });
});
