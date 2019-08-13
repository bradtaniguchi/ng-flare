import { StudyState } from '../../../modules/study/store/study.state';
import { StudyService } from './study.service';

describe('StudyService', () => {
  let service: StudyService;
  beforeEach(() => (service = new StudyService()));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCompletedPercentage', () => {
    const card1 = 'card1';
    const card2 = 'card2';
    const card3 = 'card3';
    const card4 = 'card4';
    const cards: string[] = [card1, card2, card3, card4];
    const testGetCompletedPercentage = (testCase: {
      cards: string[];
      wrong?: string[];
      correct?: string[];
      skipped?: string[];
      expected: number;
    }) =>
      expect(
        service.getCompletedPercentage({
          ...{ cards, wrong: [], correct: [], skipped: [] },
          ...testCase
        })
      ).toEqual(testCase.expected);
    it('returns 0', () =>
      testGetCompletedPercentage({
        cards,
        expected: 0
      }));
    it('returns 100, all correct', () =>
      testGetCompletedPercentage({
        cards,
        correct: [card1, card2, card3, card4],
        expected: 100
      }));
    it('returns 50, all wrong', () =>
      testGetCompletedPercentage({
        cards,
        wrong: [card1, card2],
        expected: 50
      }));
    it('returns 50, wrong and skipped', () =>
      testGetCompletedPercentage({
        cards,
        wrong: [card1],
        skipped: [card2],
        expected: 50
      }));
    it('returns 75, wrong, skipped, and correct', () =>
      testGetCompletedPercentage({
        cards,
        wrong: [card1],
        skipped: [card2],
        correct: [card3],
        expected: 75
      }));
    it('returns 66, correct', () =>
      testGetCompletedPercentage({
        cards: [card1, card2, card3],
        correct: [card1, card2],
        expected: 66
      }));
    it('returns 0/3', () =>
      testGetCompletedPercentage({
        cards: [card1, card2, card3],
        expected: 0
      }));
  });

  describe('getPrevious', () => {
    it('returns empty array', () =>
      expect(
        service.getPrevious({
          wrong: [],
          correct: [],
          skipped: []
        })
      ).toEqual([]));
    it('returns empty array, when given empty state', () =>
      expect(service.getPrevious({})).toEqual([]));
    it('returns array, of missed, correct and skipped', () =>
      expect(
        service.getPrevious({
          wrong: ['missedCard'],
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
      wrong: [],
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
          wrong: ['cardsOne']
        },
        undefined
      );
    });
    it('returns card not in missed', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: ['cardOne', 'cardTwo'] as any,
          wrong: ['cardOne']
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
