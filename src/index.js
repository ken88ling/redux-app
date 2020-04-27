import configureStore from './store/configureStore';
// import { loadBugs } from './store/bugs';
import { addBug, loadBugs, resolvedBug } from './store/bugs';

const store = configureStore();

store.dispatch(loadBugs());
setTimeout(() => store.dispatch(resolvedBug(1)), 2000);
