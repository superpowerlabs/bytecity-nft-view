const flag = true;
const App = {
  state: {
    isOnline: true,
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
  effects: (dispatch) => ({
    setVisible(visible) {
      this.updateState({ isOnline: visible });
    },
  })
};

export default App;
