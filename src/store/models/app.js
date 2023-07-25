
const App = {
  state: {
    isUnityLoaded: false,
    unitySendMessage: null,
    loadingProgression: 0,
    fullyLoaded: false,
  },
  reducers: {
    /**
     * @description 更新state
     * @param state: 当前state
     * @param payload: 更新state对象
     */
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: () => ({
    setIsUnityLoaded(isUnityLoaded) {
      this.updateState({ isUnityLoaded });
    },
    setUnitySendMessage(unitySendMessage) {
      this.updateState({ unitySendMessage });
    },
    setLoadingProgression(loadingProgression) {
      this.updateState({ loadingProgression });
    },
    setFullyLoaded(fullyLoaded) {
      this.updateState({ fullyLoaded });
    },
  })
};

export default App;
