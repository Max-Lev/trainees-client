import { MonitorContainerModule } from './monitor-container.module';

describe('MonitorContainerModule', () => {
  let monitorContainerModule: MonitorContainerModule;

  beforeEach(() => {
    monitorContainerModule = new MonitorContainerModule();
  });

  it('should create an instance', () => {
    expect(monitorContainerModule).toBeTruthy();
  });
});
