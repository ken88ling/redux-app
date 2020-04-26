import configureStore from './store/configureStore';

const store = configureStore();

store.dispatch((dispatch, getState) => {
  // calling api
  // when the promise was resolved => dispatch()
  dispatch({ type: 'bugReceived', bug: [1, 2, 3] });
  // if the promise not resolved => dispatch() another dispatch
});
