import { stateUpdate } from "../utils/stateUpdate";
import {
  GET_MOVIES_FAIL,
  GET_MOVIES_START,
  GET_MOVIES_SUCCESS,
} from "./actions";

const initialState = {
  loading: true,
  error: null,
  movies: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_START:
      return stateUpdate(state, { loading: true });
    case GET_MOVIES_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        error: null,
        movies: action.payload,
      });
    case GET_MOVIES_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default reducer;
