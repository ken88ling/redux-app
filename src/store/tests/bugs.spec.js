import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { loadBugs, addBug, getUnresolvedBugs, resolvedBug } from '../bugs';
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

  describe('loading bugs', () => {
    it('they should be fetched from the server and put in the store', async () => {
      fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

      await store.dispatch(loadBugs());

      expect(bugsSlice().list).toHaveLength(1);
    });
    describe('if the bugs exist in the cache', () => {
      it('they should not be fetched from server again', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());
        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe('if the bugs not in the cache', () => {});
    describe('loading indicator', () => {
      it('it should be loading indicator while fetching data', () => {
        fakeAxios.onGet('/bugs').reply(() => {
          expect(bugsSlice().loading).toBe(true);
          return [200, [{ id: 1 }]];
        });
        store.dispatch(loadBugs());
      });
      it('it should be false after the bugs are fetched', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
        await store.dispatch(loadBugs());
        expect(bugsSlice().loading).toBe(false);
      });
    });
  });
  it('should make as resolved if save to server', async () => {
    fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolvedBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it('should not make as resolved if not save to server', async () => {
    fakeAxios.onPatch('/bugs/1').reply(500);
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolvedBug(1));

    expect(bugsSlice().list[0].resolved).not.toBe(true);
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
