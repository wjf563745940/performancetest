import { fakeChartData,fakeFidData } from '../services/api';

export default {
  namespace: 'fid',

  state: {
    fidData: [],
    offlineChartData: [],
    daysData:{arr:[1],selected:1},
    loading: false,
  },

  effects: {
    *fetch({ payload}, { call, put }) {
      const response = yield call(fakeFidData,payload);
      response.daysData={arr:[1,3,5,7,30],selected:payload.days};
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        fidData: [],
        daysData:{arr:[1],selected:1},
        offlineChartData:[],
      };
    },
  },
};
