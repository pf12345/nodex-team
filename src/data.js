'use strict';

const nodexSdk = require("./sdk");
const SERVICE_NAME = 'nodex-team';
const setSdkOption = (header) => {
  const { appid, appsecret: appSecret } = header;
  nodexSdk.init({
    appid,
    appSecret
  })
}

exports.init = async function (args) { 
  
};

exports.createGroup = async function(header, data) {
  setSdkOption(header);
  return await nodexSdk.dss.add({
    ...data,
    dataType: `${SERVICE_NAME}-group`
  });
}

exports.updateGroup = async function(header, {id, data}) {
  setSdkOption(header);
  return await nodexSdk.dss.set({id, data});
}

exports.deleteGroup = async function(header, {id}) {
  setSdkOption(header);
  const result = await nodexSdk.dss.del({ id });
  return !!result;
}

exports.getGroupListByGid = async function(header, data) {
  setSdkOption(header);
  return await nodexSdk.dss.list({ 
    ...data,
    query: {
      ...data.query,
      gid: data.gid,
      dataType: `${SERVICE_NAME}-group`
    } 
  });
}

exports.getMemberListByGid = async function(header, {gid}) {
  setSdkOption(header);
  return await nodexSdk.dss.list({
    query: {
      gids: gid,
      dataType: `${SERVICE_NAME}-member`
    } 
  });
}

exports.createMember = async function(header, data) {
  setSdkOption(header);
  return await nodexSdk.dss.add({
    ...data,
    dataType: `${SERVICE_NAME}-member`
  });
}

exports.deleteMember = async function(header, {id}) {
  setSdkOption(header);
  return await nodexSdk.dss.del({ id });
}

exports.updateMember = async function(header, {id, data}) {
  setSdkOption(header);
  return await nodexSdk.dss.set({ id, data});
}

exports.addMemberToGroup = async function(header, {uid, gid}) {
  setSdkOption(header);
  const result = await nodexSdk.dss.get({ id: uid });
  const { gids = [] } = result && result.data || {};
  if(gids.indexOf(gid) < 0) {
    gids.push(gid);
  }
  await nodexSdk.dss.set({
    id: uid,
    data: {
      gids
    }
  });
  return await nodexSdk.dss.get({ id: uid });
}

exports.listMember = async function(header, data) {
  setSdkOption(header);
  const list = await nodexSdk.dss.list({
    ...data,
    query: {
      ...data.query,
      dataType: `${SERVICE_NAME}-member`
    }
  })
  return list;
}