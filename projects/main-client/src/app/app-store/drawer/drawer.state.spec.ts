import { DrawerReducer, DrawerState } from './drawer.state';
import {
  DrawerActions,
  SetDrawerMode,
  OpenDrawer,
  CloseDrawer,
  ToggleDrawer
} from './drawer.actions';

describe('DrawerReducer', () => {
  const testDrawerReducer = (testCase: {
    state: Partial<DrawerState>;
    action: DrawerActions;
    expected: Partial<DrawerState>;
  }) =>
    expect(DrawerReducer(testCase.state as any, testCase.action)).toEqual(
      testCase.expected as any
    );

  it('SetDrawerMode updates mode', () =>
    testDrawerReducer({
      state: {
        mode: 'open'
      },
      action: new SetDrawerMode({
        mode: 'side'
      }),
      expected: {
        mode: 'side'
      }
    }));
  it('OpenDrawer sets true', () =>
    testDrawerReducer({
      state: {
        mode: 'open',
        opened: false
      },
      action: new OpenDrawer(),
      expected: {
        mode: 'open',
        opened: true
      }
    }));
  it('OpenDrawer keeps true, when already true', () =>
    testDrawerReducer({
      state: {
        mode: 'side',
        opened: true
      },
      action: new OpenDrawer(),
      expected: {
        mode: 'side',
        opened: true
      }
    }));
  it('CloseDrawer sets false', () =>
    testDrawerReducer({
      state: {
        mode: 'push',
        opened: true
      },
      action: new CloseDrawer(),
      expected: {
        mode: 'push',
        opened: false
      }
    }));
  it('CloseDrawer keeps false if already false', () =>
    testDrawerReducer({
      state: {
        mode: 'open',
        opened: false
      },
      action: new CloseDrawer(),
      expected: {
        mode: 'open',
        opened: false
      }
    }));
  it('ToggleDrawer changes false to true', () =>
    testDrawerReducer({
      state: {
        mode: 'open',
        opened: false
      },
      action: new ToggleDrawer(),
      expected: {
        mode: 'open',
        opened: true
      }
    }));
  it('ToggleDrawer changes true to false', () =>
    testDrawerReducer({
      state: {
        mode: 'side',
        opened: true
      },
      action: new ToggleDrawer(),
      expected: {
        mode: 'side',
        opened: false
      }
    }));
});
