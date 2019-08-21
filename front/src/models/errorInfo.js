import { fakeChartData,fakeErrorInfoData,fakeErrorInfoTableData } from '../services/api';

export default {
  namespace: 'errorInfo',

  state: {
    errorInfoTableData: [],
    errorInfoData: [],
    offlineChartData: [],
    daysData:{arr:[1],selected:1},
    loading: false,
  },

  effects: {
    *fetch({ payload}, { call, put }) {
      const response = yield call(fakeErrorInfoData,payload);
      response.daysData={arr:[1,3,5,7,30],selected:payload.days};
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchTable({ payload}, { call, put }) {
      const response = yield call(fakeErrorInfoTableData,payload);
      // response.daysData={arr:[1,3],selected:payload.days};
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
        errorInfoTableData: [],
        errorInfoData: [],
        daysData:{arr:[1],selected:1},
        offlineChartData:[],
      };
    },
  },
};
