import configureStore from './store/configureStore';
import {
  bugAdded,
  bugResolved,
  getUnresolvedBugs,
  getBugsByUser,
  bugAssignToUser,
} from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();
const unsubscribe = store.subscribe(() => {
  console.log('store changed', store.getState());
});

store.dispatch(projectAdded({ name: 'project 1' }));
// store.dispatch(bugAdded({ description: 'bug 1' }));
// store.dispatch(bugAdded({ description: 'bug 2' }));
//
// unsubscribe();
// store.dispatch(bugAdded({ description: 'bug 3' }));
// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(userAdded({ name: 'Ken' }));
// store.dispatch(bugAssignToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugAssignToUser({ bugId: 2, userId: 1 }));
//
// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());
//
// console.log(x === y);
//
// const bugs = getBugsByUser(1)(store.getState());
// console.log('bugs by user', bugs);
//
// console.log('state => ', getUnresolvedBugs(store.getState()));
