import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
export async function fakeFpData() {
  return request('/api_re/fake_fp_data', { params: arguments[0] }).then(data => {
    console.log(data);
    const offlineChartData = [];
    for (let i = 0; i < 20; i += 1) {
      offlineChartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10,
      });
    }
    data.offlineChartData = offlineChartData;
    let timesData = [];

    for (let i = 0; i < 26; i += 1) {
      timesData.push({
        x: [parseFloat((i * 0.4).toFixed(1)), parseFloat(((i + 1) * 0.4).toFixed(1))],
        y: 0,
        y1: 0
      });
    }
    const fpData = [];
    data.data.forEach(item => {
      fpData.push({
        x: new Date(item.created_at).getTime(),
        y1: item.ev * 1,
        y2: item.ev * 1
      });
      var index = Math.floor(item.ev * 1 / 400);
      if (item.sua == null || item.sua == 'pc') {
        index > 25 ? (timesData[25].y1++) : (timesData[index].y++);
      } else {
        index > 25 ? (timesData[25].y1++) : (timesData[index].y1++);
      }

    })
    data.fpData = fpData;

    data.timesData = timesData;
    console.log(data);
    return data;
  });
}
export async function fakeTtiData() {
  return request('/api_re/fake_tti_data', { params: arguments[0] }).then(data => {
    let timesData = [];

    for (let i = 0; i < 26; i += 1) {
      timesData.push({
        name: 'pc',
        x: [parseFloat((i * 0.4).toFixed(1)), parseFloat(((i + 1) * 0.4).toFixed(1))],
        y: 0
      });
    }
    for (let i = 0; i < 26; i += 1) {
      timesData.push({
        name: 'mobile',
        x: [parseFloat((i * 0.4).toFixed(1)), parseFloat(((i + 1) * 0.4).toFixed(1))],
        y: 0
      });
    }
    const offlineChartData = [];
    data.offlineChartData = offlineChartData;
    const fpData = [];
    data.data.forEach(item => {
      fpData.push({
        x: new Date(item.created_at).getTime(),
        y1: item.ev * 1,
        y2: item.ev * 1
      });
      var index = Math.floor(item.ev * 1 / 400);
      if (item.sua == null || item.sua == 'pc') {
        index > 25 ? (timesData[25].y++) : (timesData[index].y++);
      } else {
        index > 25 ? (timesData[51].y++) : (timesData[index + 26].y++);
      }
    })
    data.ttiData = fpData;
    data.timesData = timesData;
    console.log(data);
    return data;
  });
}
export async function fakeFidData() {
  return request('/api_re/fake_fid_data', { params: arguments[0] }).then(data => {
    const offlineChartData = [];
    data.offlineChartData = offlineChartData;
    const fpData = [];
    data.data.forEach(item => {
      fpData.push({
        x: new Date(item.created_at).getTime(),
        y1: item.ev * 1,
        //  y2:item.ev*1
      })
    })
    data.fidData = fpData;
    console.log(data);
    return data;
  });
}
export async function fakeErrorInfoData() {
  return request('/api_re/fake_errorInfo_data', { params: arguments[0] }).then(data => {
    const offlineChartData = [];
    data.offlineChartData = offlineChartData;
    const fpData = [];
    let lastDate = '';
    data.data.forEach(item => {
      let date = new Date(item.created_at).toLocaleDateString();
      if (fpData.length == 0) {
        fpData.push({
          x: date,
          y: 1,
        });

      } else {
        if (lastDate == '' || lastDate == date) {
          fpData[fpData.length - 1].y++;
        } else {
          fpData.push({
            x: date,
            y: 1,
          });
        }
      }
      lastDate = date;
    })
    data.errorInfoData = fpData;
    console.log(data);
    return data;
  });
}
export async function fakeErrorInfoTableData() {
  return request('/api_re/fake_errorInfoPage_data', { params: arguments[0] }).then(data => {
    const offlineChartData = [];
    data.offlineChartData = offlineChartData;
    const fpData = {
      list: data.data.rows,
      pagination: {
        current: data.data.current,
        pageSize: data.data.pageSize,
        total: data.data.count,
      }
    }
    data.errorInfoTableData = fpData;
    console.log(data);
    return data;
  });
}
export async function fakeLongTaskData() {
  function getLongTimeIndex(time){
    if(time >=500 && time<1000){
      return 0;
    }else if(time<2000){
      return 1;
    }
    else if(time<3000){
      return 2;
    }
    else if(time<5000){
      return 3;
    }
    else if(time<10000){
      return 4;
    }else{
      return 5;
    }
  }
  return request('/api_re/fake_LongTask_data', { params: arguments[0] }).then(data => {
    const offlineChartData = [];
    data.offlineChartData = offlineChartData;
    const fpData = [];
    let lastDate = '';
    let morestDay= new Date(data.data[0].created_at).toLocaleDateString();

    let laestDay= new Date(data.data[data.data.length-1].created_at).toLocaleDateString();
    let dayss=(new Date(laestDay)-new Date(morestDay))/24/3600/1000+1;
    for(let i=0;i<dayss*6;i++){
      fpData[i]=[i%dayss,Math.floor(i/dayss),0];
    }
    console.log(fpData);
    data.data.forEach(item => {
      let date = new Date(item.created_at).toLocaleDateString();
      console.log(getLongTimeIndex(item.ev)*dayss+((new Date(date)-new Date(morestDay))/24/3600/1000))
        fpData[getLongTimeIndex(item.ev)*dayss+((new Date(date)-new Date(morestDay))/24/3600/1000)][2]+=1;
    })
    data.longTaskData = fpData;
    console.log(data);
    return data;
  });
}
export async function fakeLongTaskTableData() {
  return request('/api_re/fake_LongTaskPage_data', { params: arguments[0] }).then(data => {
    const offlineChartData = [];
    data.offlineChartData = offlineChartData;
    const fpData = {
      list: data.data.rows,
      pagination: {
        current: data.data.current,
        pageSize: data.data.pageSize,
        total: data.data.count,
      }
    }
    data.longTaskTableData = fpData;
    console.log(data);
    return data;
  });
}
export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
