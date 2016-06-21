import { createStore } from 'redux';
import { rootReducer} from '../reducers/rootReducer';

export function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState
  );

  return store;
}
