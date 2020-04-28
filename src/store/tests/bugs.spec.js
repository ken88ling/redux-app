import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, getUnresolvedBugs } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
  let fakeAxios;
  let store;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });
  it("should add the bug to the store if it's save to the server", async () => {
    // Arrange
    const bug = { description: 'a' };
    const saveBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(200, saveBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toContainEqual(saveBug);
  });

  it("should not add the bug to the store if it's not save to the server", async () => {
    const bug = { description: 'a' };
    fakeAxios.onPost('/bugs').reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });
  describe('selector', () => {
    it('getUnresolvedBugs', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
