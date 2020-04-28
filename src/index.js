import configureStore from './store/configureStore';
// import { loadBugs } from './store/bugs';
import { addBug, assignBugToUser, loadBugs, resolvedBug } from './store/bugs';

const store = configureStore();

store.dispatch(loadBugs());
// setTimeout(() => store.dispatch(resolvedBug(1)), 2000);
setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);
