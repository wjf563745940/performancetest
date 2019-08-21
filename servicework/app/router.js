'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/collectdata', controller.api.collectdata);
  router.get('/api/fake_fp_data', controller.api.fakeFpData);
  router.get('/api/fake_tti_data', controller.api.fakeTtiData);
  router.get('/api/fake_fid_data', controller.api.fakeFidData);
  router.get('/api/fake_errorInfo_data', controller.api.fakeErrorInfoData);
  router.get('/api/fake_errorInfoPage_data', controller.api.fakeErrorInfoPageData);
  router.get('/api/fake_LongTask_data', controller.api.fakeLongTaskData);
  router.get('/api/fake_LongTaskPage_data', controller.api.fakeLongTaskPageData);
  router.resources('users', '/users', controller.users);
};
