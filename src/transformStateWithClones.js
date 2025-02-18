'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };

  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      // stateClone = { ...stateHistory[i] };

      Object.assign(stateClone, actions[i].extraData);
      stateHistory.push({ ...stateClone });
    }

    if (actions[i].type === 'removeProperties') {
      // stateClone = { ...stateHistory[i] };

      for (const key of actions[i].keysToRemove) {
        delete stateClone[key];
      }
      stateHistory.push({ ...stateClone });
    }

    if (actions[i].type === 'clear') {
      for (const key of Object.keys(stateClone)) {
        delete stateClone[key];
      }
      stateHistory.push({ ...stateClone });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
