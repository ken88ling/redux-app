import configureStore from './store/configureStore';
import { bugAdded, bugResolved, getUnresolvedBugs } from './store/bugs';
import { projectAdded } from './store/projects';

const store = configureStore();
const unsubscribe = store.subscribe(() => {
  console.log('store changed', store.getState());
});

store.dispatch(projectAdded({ name: 'project 1' }));
store.dispatch(bugAdded({ description: 'bug 1' }));
store.dispatch(bugAdded({ description: 'bug 2' }));

unsubscribe();
store.dispatch(bugAdded({ description: 'bug 3' }));
store.dispatch(bugResolved({ id: 1 }));

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log(x === y);

console.log('state => ', getUnresolvedBugs(store.getState()));
