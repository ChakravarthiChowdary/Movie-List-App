export const stateUpdate = (oldState, newState) => {
  return {
    ...oldState,
    ...newState,
  };
};
