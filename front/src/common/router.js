import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/collectdata/fp':{
      component:dynamicWrapper(app,['fp'],()=>import('../routes/Collectdata/Fp')),
    },
    '/collectdata/tti':{
      component:dynamicWrapper(app,['tti'],()=>import('../routes/Collectdata/Tti')),
    },
    '/collectdata/fid':{
      component:dynamicWrapper(app,['fid'],()=>import('../routes/Collectdata/Fid')),
    },
    '/rum/longtask':{
      component:dynamicWrapper(app,['longTask'],()=>import('../routes/Rum/LongTask')),
    },
    '/rum/errorInfo':{
      component:dynamicWrapper(app,['errorInfo'],()=>import('../routes/Rum/ErrorInfo')),
    },
    
    '/d3base/array':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3base/Array')),
    },
    '/d3base/dom':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3base/Dom')),
    },
    '/d3base/scale':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3base/Scale')),
    },
    '/d3base/axis':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3base/Axis')),
    },
    '/d3base/color':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3base/Color')),
    },
    '/d3base/path':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3base/Path')),
    },
    '/d3base/transition':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3base/Transition')),
    },
    '/d3Svg/line':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Line')),
    },
    '/d3Svg/jiben':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Jiben')),
    },
    '/d3Svg/zhifan':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/ZhiFan')),
    },
    '/d3Svg/sandian':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Sandian')),
    },
    '/d3Svg/zhexian':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Zhexian')),
    },
    '/d3Svg/pie':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Pie')),
    },
    '/d3Svg/forceLine':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/ForceLine')),
    },
    '/d3Svg/tree':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Tree')),
    },
    '/d3Svg/dendrogram':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Dendrogram')),
    },
    '/d3Svg/ditu':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Ditu')),
    },
    '/d3Svg/leida':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Leida')),
    },
    '/d3Svg/leida2':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Leida2')),
    },
    '/d3Svg/leida3':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Leida3')),
    },
    
    '/d3Svg/dbline':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Dbline')),
    },
    '/d3Svg/bar':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Bar'))
    },
    '/d3Svg/pie2':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/Pie2'))
    },
    '/d3Svg/kLine':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/KLine'))
    },
    '/d3Svg/keyChart':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/keyChart'))
    },
    '/d3Svg/renkoChart':{
      component:dynamicWrapper(app,[],()=>import('../routes/D3Svg/renkoChart'))
    },
    

    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () =>
        import('../routes/Dashboard/Workplace')
      ),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      name: '分步表单（填写转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      name: '分步表单（确认转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      name: '分步表单（完成）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () =>
        import('../routes/Profile/AdvancedProfile')
      ),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
