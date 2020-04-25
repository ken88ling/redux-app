import configureStore from './store/configureStore';
import * as actions from './store/bugs';

const store = configureStore();
const unsubscribe = store.subscribe(() => {
  console.log('store changed', store.getState());
});

store.dispatch(actions.bugAdded('bug 1'));
store.dispatch(actions.bugAdded('bug 2'));
store.dispatch(actions.bugAdded('bug 3'));
store.dispatch(actions.bugResolved(1));

unsubscribe();
store.dispatch(actions.bugRemoved(2));

console.log('state => ', store.getState());
