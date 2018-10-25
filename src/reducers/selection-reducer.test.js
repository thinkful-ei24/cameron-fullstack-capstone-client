import selectionReducer from './selection-reducer';
import {
  fetchContestantsRequest, fetchContestantsSuccess, fetchContestantsError, addSelection,
  deleteSelection, submitGuessesSuccess, submitGuessesError, getStatusSuccess, clearError
} from '../actions/selection-actions';

import {
  fetchResultsSuccess, fetchResultsError
} from '../actions/results-actions';

import {
  fetchLeaderboardSuccess
} from '../actions/leaderboard-actions';

describe('selectionReducer', () => {
  const initialState = {
    loading: false,
    selectionError: null,
    resultsError: null,
    week0: [],
    week1: [],
    week2: [],
    week3: [],
    week4: [],
    week5: [],
    week6: [],
    week7: [],
    week8: [],
    week9: [],
    week10: [],
    status: null,
    results: {
      week1: {}, week2: {}, week3: {}, week4: {}, week5: {},
      week6: {}, week7: {}, week8: {}, week9: {}, week10: {}
    },
    scores: Array(10).fill(''),
    leaderboard: null,
    fullWeeks: []
  }
  it('Should set the initial state when nothing is passed in', () => {
    const state = selectionReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = selectionReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toEqual(currentState);
  });

  describe('fetchContestantsRequest', () => {
    it('Should update state to reflect request', () => {
      let state = {
        loading: false,
        selectionError: 'asdfadf'
      };
      state = selectionReducer(state, fetchContestantsRequest());
      expect(state).toEqual({
        loading: true,
        selectionError: null,
        resultsError: null
      });
    });
  });

  describe('fetchContestantsSuccess', () => {
    it('Should update contestants', () => {
      const contestants = ['Bob', 'George'];
      let state = {
        loading: true
      }
      state = selectionReducer(state, fetchContestantsSuccess(contestants));
      expect(state).toEqual({
        loading: false,
        week0: contestants
      });
    });
  });

  describe('fetchContestantsError', () => {
    it('Should set error', () => {
      const error = 'error';
      let state = {
        loading: true
      }
      state = selectionReducer(state, fetchContestantsError(error));
      expect(state).toEqual({
        loading: false,
        selectionError: error
      });
    });
  });
});

describe('addSelection', () => {
  it('Should update contestants', () => {
    const contestant = 'Bob';
    const week = 8;
    let state = {
      week1: ['George', 'Luke'],
      week2: ['George', 'Luke'],
      week3: ['George', 'Luke'],
      week4: ['George', 'Luke'],
      week5: ['George', 'Luke'],
      week6: ['George', 'Luke'],
      week7: ['George', 'Luke'],
      week8: ['George', 'Luke'],
      week9: ['George', 'Luke'],
      week10: [],
      fullWeeks: [9]
    }
    state = selectionReducer(state, addSelection(contestant, week));
    expect(state).toEqual({
      week1: ['George', 'Luke', 'Bob'],
      week2: ['George', 'Luke', 'Bob'],
      week3: ['George', 'Luke', 'Bob'],
      week4: ['George', 'Luke', 'Bob'],
      week5: ['George', 'Luke', 'Bob'],
      week6: ['George', 'Luke', 'Bob'],
      week7: ['George', 'Luke', 'Bob'],
      week8: ['George', 'Luke', 'Bob'],
      week9: ['George', 'Luke'],
      week10: [],
      fullWeeks: [9, 8]
    });
  });
});

describe('deleteSelection', () => {
  it('Should update contestants', () => {
    const contestant = 'Bob';
    const week = 8;
    let state = {
      week1: ['George', 'Luke', 'Bob'],
      week2: ['George', 'Luke', 'Bob'],
      week3: ['George', 'Luke', 'Bob'],
      week4: ['George', 'Luke', 'Bob'],
      week5: ['George', 'Luke', 'Bob'],
      week6: ['George', 'Luke', 'Bob'],
      week7: ['George', 'Luke', 'Bob'],
      week8: ['George', 'Luke', 'Bob'],
      week9: ['George', 'Bob'],
      week10: [],
      fullWeeks: [8, 9]
    }
    state = selectionReducer(state, deleteSelection(contestant, week));
    expect(state).toEqual({
      week1: ['George', 'Luke', 'Bob'],
      week2: ['George', 'Luke', 'Bob'],
      week3: ['George', 'Luke', 'Bob'],
      week4: ['George', 'Luke', 'Bob'],
      week5: ['George', 'Luke', 'Bob'],
      week6: ['George', 'Luke', 'Bob'],
      week7: ['George', 'Luke', 'Bob'],
      week8: ['George', 'Luke'],
      week9: ['George'],
      week10: [],
      fullWeeks: []
    });
  });
});

describe('submitGuessesSuccess', () => {
  it('Should update status', () => {
    const status = 'choosing';
    let state = {
      loading: true
    }
    state = selectionReducer(state, submitGuessesSuccess(status));
    expect(state).toEqual({
      loading: false,
      status
    });
  });
});

describe('submitGuessesError', () => {
  it('Should set error', () => {
    const error = 'error';
    let state = {
      loading: true
    }
    state = selectionReducer(state, submitGuessesError(error));
    expect(state).toEqual({
      loading: false,
      selectionError: error
    });
  });
});

describe('fetchResultsSuccess', () => {
  it('Should update status', () => {
    const data = {
      status: 'choosing',
      scores: [12, 3, 4, 5],
      feedback: [{ week: 'week1', guesses: [{ name: 'Bob', guess: 'correct' }] }]
    };
    let state = {
      loading: true
    }
    state = selectionReducer(state, fetchResultsSuccess(data));
    expect(state).toEqual({
      loading: false,
      status: data.status,
      scores: data.scores,
      results: data.feedback
    });
  });
});

describe('getStatusSuccess', () => {
  it('Should update status', () => {
    const status = 'choosing';
    let state = {};
    state = selectionReducer(state, getStatusSuccess(status));
    expect(state).toEqual({
      status
    });
  });
});


describe('clearError', () => {
  it('Should clear errors', () => {
    const error = 'error';
    let state = {
      resultsError: error,
      selectionError: error
    }
    state = selectionReducer(state, clearError());
    expect(state).toEqual({
      resultsError: null,
      selectionError: null
    });
  });
});

describe('fetchResultsError', () => {
  it('Should set error', () => {
    const error = 'error';
    let state = {
      loading: true
    }
    state = selectionReducer(state, fetchResultsError(error));
    expect(state).toEqual({
      resultsError: error,
      loading: false
    });
  });
});

describe('fetchLeaderboardSuccess', () => {
  it('Should update status', () => {
    const leaderboard = [{name: 'Bob'}]
    let state = {
      loading: true
    };
    state = selectionReducer(state, fetchLeaderboardSuccess(leaderboard));
    expect(state).toEqual({
      loading: false,
      leaderboard
    });
  });
});


    // describe('clearAuth', () => {
    //   it('Should clear authToken and currentUser', () => {
    //     let state = {
    //       authToken: 'asdhkasdfhkd',
    //       currentUser: 'asdklj',
    //       loading: false,
    //       error: null,
    //       infoDisplay: false 
    //     }
    //     state = selectionReducer(state, clearAuth());
    //     expect(state).toEqual(initialState);
    //   });
    // });

    // describe('authRequest', () => {
    //   it('Should set loading and clear error and status', () => {
    //     let state = {
    //       loading: false,
    //       error: 'error'
    //     }
    //     state = selectionReducer(state, authRequest());
    //     expect(state).toEqual({
    //       loading: true,
    //       error: null
    //     });
    //   });
    // });




    // describe('toggleInfoDisplay', () => {
    //   it('Should set auth', () => {
    //     const infoDisplay = true;
    //     let state = {
    //       infoDisplay
    //     }
    //     state = selectionReducer(state, toggleInfoDisplay());
    //     expect(state).toEqual({
    //       infoDisplay: !infoDisplay
    //     });
    //   });
    // });

