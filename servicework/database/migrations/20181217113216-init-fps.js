'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('fps', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      v: INTEGER,//协议的版本。当前值为“1”。只有出现不向后兼容的更改时，此值才会改变。
      tid: STRING(30),//该 ID 用于区分是要向哪个 Google Analytics（分析）媒体资源发送数据
      cid:STRING(100),//每位用户专属的ID
      t:STRING(20),//针对特定用户收集的互动数据类型
      sr:STRING(30),//指定屏幕分辨率。
      vp:STRING(30),//指定浏览器/设备的可视区域大小。
      ni:INTEGER,//指定是否将匹配视为非互动性质
      dl:STRING(100),//用此值来发送内容所在网页的完整网址
      ul:STRING(20),//指定语言。
      de:STRING(20),//指定编码。
      dt:STRING(30),//文档的标题。
      sd:STRING(30),//指定屏幕颜色深度。
      je:INTEGER,//指定是否启用了 Java
      ec:{type:STRING(100),allowNull:false},//指定事件类别。值不能为空。
      ea:{type:STRING(100),allowNull:false},//指定事件操作。值不能为空。
      ev:{type:STRING(100),allowNull:false},//指定事件价值。值不得为负数。
      sua:{type:STRING(20)},//指定平台地址
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('fps');
  },
};