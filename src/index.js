import configureStore from './store/configureStore';
import * as actions from './store/bugs';
import { projectAdded } from './store/projects';

const store = configureStore();
const unsubscribe = store.subscribe(() => {
  console.log('store changed', store.getState());
});

store.dispatch(projectAdded({ name: 'project 1' }));
store.dispatch(actions.bugAdded({ description: 'bug 1' }));
store.dispatch(actions.bugAdded({ description: 'bug 2' }));

unsubscribe();
store.dispatch(actions.bugAdded({ description: 'bug 3' }));
store.dispatch(actions.bugResolved({ id: 1 }));

// console.log('state => ', store.getState());
