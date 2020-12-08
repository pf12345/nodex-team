'use strict';

const sdk = require("./sdk");
const SERVICE_NAME = 'nodex-team';

exports.init = async function (args) {
  const { appid, appSecret } = args;
  sdk.init({
    appid,
    appSecret
  })
};

exports.createGroup = async function (header, data) {
  const { appid } = header;
  return await sdk.dss.add({
    ...data,
    appid,
    dataType: `${SERVICE_NAME}-group`
  });
}

exports.updateGroup = async function (header, { id, data }) {
  const { appid } = header;
  return await sdk.dss.set({ appid, id, data });
}

exports.deleteGroup = async function (header, { id }) {
  const { appid } = header;
  const result = await sdk.dss.del({ appid, id });
  return !!result;
}

exports.getGroupListByGid = async function (header, data) {
  const { appid } = header;
  return await sdk.dss.list({
    appid,
    ...data,
    query: {
      ...data.query,
      gid: data.gid,
      dataType: `${SERVICE_NAME}-group`
    }
  });
}

exports.getMemberListByGid = async function (header, { gid }) {
  const { appid } = header;
  return await sdk.dss.list({
    appid,
    query: {
      gids: gid,
      dataType: `${SERVICE_NAME}-member`
    }
  });
}

exports.createMember = async function (header, data) {
  const { appid } = header;
  return await sdk.dss.add({
    appid,
    ...data,
    dataType: `${SERVICE_NAME}-member`
  });
}

exports.deleteMember = async function (header, { id }) {
  const { appid } = header;
  return await sdk.dss.del({ appid, id });
}

exports.updateMember = async function (header, { id, data }) {
  const { appid } = header;
  return await sdk.dss.set({ appid, id, data });
}

exports.addMemberToGroup = async function (header, { uid, gid }) {
  const { appid } = header;
  const result = await sdk.dss.get({ id: uid });
  const { gids = [] } = result && result.data || {};
  if (gids.indexOf(gid) < 0) {
    gids.push(gid);
  }
  await sdk.dss.set({
    appid,
    id: uid,
    data: {
      gids
    }
  });
  return await sdk.dss.get({ id: uid });
}

exports.listMember = async function (header, data) {
  const { appid } = header;
  const list = await sdk.dss.list({
    appid,
    ...data,
    query: {
      ...data.query,
      dataType: `${SERVICE_NAME}-member`
    }
  })
  return list;
}