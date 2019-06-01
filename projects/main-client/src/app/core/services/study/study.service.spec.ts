import { StudyService } from './study.service';
import { Card } from '../../../models/card';
import { StudyState } from '../../../modules/study/store/study.state';

describe('StudyService', () => {
  let service: StudyService;
  beforeEach(() => (service = new StudyService()));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPrevious', () => {
    it('returns empty array', () =>
      expect(
        service.getPrevious({
          missed: [],
          correct: [],
          skipped: []
        })
      ).toEqual([]));
    it('returns empty array, when given empty state', () =>
      expect(service.getPrevious({})).toEqual([]));
    it('returns array, of missed, correct and skipped', () =>
      expect(
        service.getPrevious({
          missed: ['missedCard'],
          correct: ['correctCard', 'correctCard2'],
          skipped: ['skippedCard']
        })
      ).toEqual(['missedCard', 'correctCard', 'correctCard2', 'skippedCard']));
  });

  describe('getNextCard', () => {
    let getRandomSpy: jasmine.Spy;
    beforeEach(() => {
      getRandomSpy = spyOn(
        StudyService.prototype as any,
        'getRandom'
      ).and.returnValue(0);
    });
    const testGetNextCard = (state: StudyState, expected: Partial<Card>) => {
      expect(service.getNextCard(state)).toEqual(expected as any);
    };
    const defaultState: StudyState = {
      card: undefined,
      deck: undefined,
      flipped: false,
      cards: [],
      correct: [],
      missed: [],
      skipped: []
    };
    it('returns undefined if cards is empty array', () => {
      testGetNextCard(
        {
          ...defaultState
        },
        undefined
      );
    });
    it('returns undefined, if all cards already studied', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [{ uid: { uid: 'cardOne' } }] as any,
          missed: ['cardsOne']
        },
        undefined
      );
    });
    it('returns card not in missed', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [{ uid: 'cardOne' }, { uid: 'cardTwo' }] as any,
          missed: ['cardOne']
        },
        {
          uid: 'cardTwo'
        }
      );
    });
    it('returns card not in skipped', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [{ uid: 'cardOne' }, { uid: 'cardTwo' }] as any,
          skipped: ['cardTwo']
        },
        {
          uid: 'cardOne'
        }
      );
    });
    it('returns card not in correct', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [
            { uid: 'cardOne' },
            { uid: 'cardTwo' },
            { uid: 'cardThree' }
          ] as any,
          correct: ['cardOne', 'cardThree']
        },
        {
          uid: 'cardTwo'
        }
      );
    });
    it('returns second card', () => {
      getRandomSpy.and.returnValue(1);
      testGetNextCard(
        {
          ...defaultState,
          cards: [
            { uid: 'cardOne' },
            { uid: 'cardTwo' },
            { uid: 'cardThree' }
          ] as any,
          correct: ['cardOne']
        },
        {
          uid: 'cardThree'
        }
      );
    });
  });
});
