import { StudyState } from '../../../modules/study/store/study.state';
import { StudyService } from './study.service';

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
    const testGetNextCard = (state: StudyState, expected: string) => {
      expect(service.getNextCard(state)).toEqual(expected);
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
          cards: ['cardOne'],
          missed: ['cardsOne']
        },
        undefined
      );
    });
    it('returns card not in missed', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: ['cardOne', 'cardTwo'] as any,
          missed: ['cardOne']
        },
        'cardTwo'
      );
    });
    it('returns card not in skipped', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: ['cardOne', 'cardTwo'] as any,
          skipped: ['cardTwo']
        },
        'cardOne'
      );
    });
    it('returns card not in correct', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: ['cardOne', 'cardTwo', 'cardThree'],
          correct: ['cardOne', 'cardThree']
        },
        'cardTwo'
      );
    });
    it('returns second card', () => {
      getRandomSpy.and.returnValue(1);
      testGetNextCard(
        {
          ...defaultState,
          cards: ['cardOne', 'cardTwo', 'cardThree'],
          correct: ['cardOne']
        },
        'cardThree'
      );
    });
  });
});
