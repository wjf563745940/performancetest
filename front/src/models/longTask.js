import { fakeChartData,fakeLongTaskData,fakeLongTaskTableData } from '../services/api';

export default {
  namespace: 'longTask',

  state: {
    longTaskTableData: [],
    longTaskData: [],
    offlineChartData: [],
    daysData:{arr:[3],selected:3},
    loading: false,
  },

  effects: {
    *fetch({ payload}, { call, put }) {
      const response = yield call(fakeLongTaskData,payload);
      response.daysData={arr:[3,5,7,30],selected:payload.days};
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchTable({ payload}, { call, put }) {
      const response = yield call(fakeLongTaskTableData,payload);
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
        longTaskTableData: [],
        longTaskData: [],
        daysData:{arr:[3],selected:3},
        offlineChartData:[],
      };
    },
  },
};
