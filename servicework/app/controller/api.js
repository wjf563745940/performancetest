'use strict';

const Controller = require('../core/base_controller');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class ApiController extends Controller {
  async collectdata() {
    let ctx=this.ctx;
    console.log(ctx.query.ea);
    if(ctx.query.exd!==undefined || ctx.query.ea==='longtask'){
      const uu=await ctx.model.User.create({name:'1',age:2});
      const t2=await ctx.model.Test2.create({firstName:'1'})
      const rum = await ctx.model.Rum.create(ctx.query);
       ctx.status = 201;
        ctx.body = 'success';
    }
    if(ctx.query.ea!==undefined && (ctx.query.ea==='first-paint' || ctx.query.ea==='first-contentful-paint' || ctx.query.ea==='TTI' || ctx.query.ea==='first-input-delay')){
      const Fp = await ctx.model.Fp.create(ctx.query);
       ctx.status = 201;
        ctx.body = 'success';
    }
    ctx.body = 'no api';
  }
  async fakeFpData(){
    let ctx=this.ctx;
    // if(ctx.query)
    let days=ctx.query.days?ctx.query.days-1:0;
    var query={
      where:{
        ea:'first-paint',
        // created_at: {
        //   [Op.lt]: new Date(),
        //   [Op.gt]: new Date(new Date(new Date().toLocaleDateString() )-days*24*3600*1000)
        // }
      }
    }
    const result= await ctx.model.Fp.findAll(query);
    this.success(result);
  }
  async fakeTtiData(){
    let ctx=this.ctx;
    let days=ctx.query.days?ctx.query.days-1:0;
    let query={
      where:{
        ea:'TTI',
        created_at: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date(new Date().toLocaleDateString() )-days*24*3600*1000)
        }
      }
    };
    const result =await ctx.model.Fp.findAll(query);
    this.success(result);
  }

  async fakeFidData(){
    let ctx=this.ctx;
    let days=ctx.query.days?ctx.query.days-1:0;
    let query={
      where:{
        ea:'first-input-delay',
        created_at: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date(new Date().toLocaleDateString() )-days*24*3600*1000)
        }
      }
    };
    const result = await ctx.model.Fp.findAll(query);
    this.success(result);
  }

  async fakeErrorInfoData(){
       let ctx=this.ctx;
       let days=ctx.query.days?ctx.query.days-1:0;
       let query={
         where:{
          exd:{
            [Op.not]:null
          },
          created_at: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(new Date(new Date().toLocaleDateString() )-days*24*3600*1000)
          }
         }
       }
       const result = await ctx.model.Rum.findAll(query);
       this.success(result);
  }
  async fakeErrorInfoPageData(){
    let ctx=this.ctx;
    let {limit,offset} =ctx.query;
    let query={
      where:{
       exd:{
         [Op.not]:null
       }
      },
       limit: parseInt(limit),
       offset:parseInt(offset),
    }
    const result = await ctx.model.Rum.findAndCountAll(query);
    result.offset=parseInt(offset);
    result.limit=parseInt(limit);
    result.current=parseInt(offset)/parseInt(limit)+1;
    result.pageSize=parseInt(limit);
    this.success(result);
}
async fakeLongTaskData(){
  let ctx=this.ctx;
  let days=ctx.query.days?ctx.query.days-1:0;
  let query={
    where:{
      ea:'longtask',
     created_at: {
       [Op.lt]: new Date(),
       [Op.gt]: new Date(new Date(new Date().toLocaleDateString() )-days*24*3600*1000)
     }
    }
  }
  const result = await ctx.model.Rum.findAll(query);
  this.success(result);
}
async fakeLongTaskPageData(){
  let ctx=this.ctx;
  let {limit,offset} =ctx.query;
  let query={
    where:{
      ea:'longtask',
    },
     limit: parseInt(limit),
     offset:parseInt(offset),
  }
  const result = await ctx.model.Rum.findAndCountAll(query);
  result.offset=parseInt(offset);
  result.limit=parseInt(limit);
  result.current=parseInt(offset)/parseInt(limit)+1;
  result.pageSize=parseInt(limit);
  this.success(result);
}
}

module.exports = ApiController;
