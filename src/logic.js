'use strict';
const { runtime, libs } = nodex;
const { fmt } = libs;
const { data: dataRunTime } = runtime;

exports.init = async function (args) { 
  console.log('logic init.');
  console.log('logic init args:', args);
};

/**
 * 添加部门
 * name 部门名称
 * gid 所属部门Id
 * otherParams 其他额外数据
 * @param {*} param0 
 */
exports.createGroup = async function({ header, name, gid, ...otherParams }) {
  fmt.required(name, 'string', 2, 64);
  return await dataRunTime.createGroup(header, {name, gid, ...otherParams});
}

/**
 * 修改部门
 * id 修改的部门id
 * @param {*} param0 
 */
exports.updateGroup = async function({header, id, data}) {
  fmt.required(id, 'word', 2, 64);
  if(data.hasOwnProperty("name")) {
    fmt.required(data.name, 'string', 2, 64);
  }
  if(data.hasOwnProperty("tid")) {
    fmt.required(data.tid, 'word', 2, 64);
  }
  if(data.hasOwnProperty("gid")) {
    fmt.required(data.gid, 'word', 2, 64);
  }
  return await dataRunTime.updateGroup(header, {id, data});
}

/**
 * 删除部门
 * id 删除部门的部门id
 * @param {*} param0 
 */
exports.deleteGroup = async function({header, id}) {
  fmt.required(id, 'word', 2, 64);
  return await dataRunTime.deleteGroup(header, { id });
}

/**
 * 获取某部门下所有一级部门列表
 * @param {*} param0 
 */
exports.getGroupListByGid = async function({header, gid, ...otherParams}) {
  fmt.required(gid, 'word', 2, 64);
  return await dataRunTime.getGroupListByGid(header, { gid, ...otherParams });
}

/**
 * 获取某部门下所有用户
 * @param {*} param0 
 */
exports.getMemberListByGid = async function({header, gid}) {
  fmt.required(gid, 'word', 2, 64);
  return await dataRunTime.getMemberListByGid(header, { gid });
}

/**
 * 添加用户
 * @param {*} param0 
 */
exports.createMember = async function({header, name, ...otherParams}) {
  fmt.required(name, 'string', 2, 64);
  return await dataRunTime.createMember(header, {name, ...otherParams});
}

/**
 * 更新用户信息
 * @param {*} param0 
 */
exports.updateMember = async function({header, id, data}) {
  fmt.required(id, 'word', 2, 64);
  if(data.hasOwnProperty("name")) {
    fmt.required(data.name, 'string', 2, 64);
  }
  return await dataRunTime.updateMember(header, {id, data});
}

/**
 * 删除成员
 * @param {*} param0 
 */
exports.deleteMember = async function({header, id}) {
  fmt.required(id, 'word', 2, 64);
  return await dataRunTime.deleteMember(header, {id});
}

/**
 * 添加用户到某部门
 * @param {*} param0 
 */
exports.addMemberToGroup = async function({header, uid, gid}) {
  fmt.required(uid, 'word', 2, 64);
  fmt.required(gid, 'word', 2, 64);
  return await dataRunTime.addMemberToGroup(header, {uid, gid});
}

/**
 * 获取用户列表
 * @param {*} params 
 */
exports.listMember = async function({header, ...otherParams}) {
  return await dataRunTime.listMember(header, otherParams);
}