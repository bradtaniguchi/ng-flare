import { TestBed } from '@angular/core/testing';

import { WindowInjectorService } from './window-injector.service';

xdescribe('WindowInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: WindowInjectorService = TestBed.get(WindowInjectorService);
    expect(service).toBeTruthy();
  });
});
