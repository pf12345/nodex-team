'use strict';
const { runtime, libs } = nodex;
const { fmt } = libs;

/**
 * 添加部门
 * name 部门名称
 * gid 所属部门Id
 * otherParams 其他额外数据
 * @param {*} param0 
 */
exports.createGroup = async function({ header, name, gid, ...otherParams }) {
  fmt.required(name, 'string', 2, 64);
  return await runtime.data.createGroup(header, {name, gid, ...otherParams});
}

/**
 * 修改部门
 * id 修改的部门id
 * @param {*} param0 
 */
exports.updateGroup = async function({header, id, data}) {
  fmt.required(id, 'word', 2, 64);
  fmt.optional(data.name, 'string', 2, 64);
  fmt.optional(data.tid, 'word', 2, 64);
  fmt.optional(data.gid, 'word', 2, 64);
  return await runtime.data.updateGroup(header, {id, data});
}

/**
 * 删除部门
 * id 删除部门的部门id
 * @param {*} param0 
 */
exports.deleteGroup = async function({header, id}) {
  fmt.required(id, 'word', 2, 64);
  return await runtime.data.deleteGroup(header, { id });
}

/**
 * 获取某部门下所有一级部门列表
 * @param {*} param0 
 */
exports.getGroupListByGid = async function({header, gid, ...otherParams}) {
  fmt.required(gid, 'word', 2, 64);
  return await runtime.data.getGroupListByGid(header, { gid, ...otherParams });
}

/**
 * 获取某部门下所有用户
 * @param {*} param0 
 */
exports.getMemberListByGid = async function({header, gid}) {
  fmt.required(gid, 'word', 2, 64);
  return await runtime.data.getMemberListByGid(header, { gid });
}

/**
 * 添加用户
 * @param {*} param0 
 */
exports.createMember = async function({header, name, ...otherParams}) {
  fmt.required(name, 'string', 2, 64);
  return await runtime.data.createMember(header, {name, ...otherParams});
}

/**
 * 更新用户信息
 * @param {*} param0 
 */
exports.updateMember = async function({header, id, data}) {
  fmt.required(id, 'word', 2, 64);
  fmt.optional(data.name, 'string', 2, 64);
  return await runtime.data.updateMember(header, {id, data});
}

/**
 * 删除成员
 * @param {*} param0 
 */
exports.deleteMember = async function({header, id}) {
  fmt.required(id, 'word', 2, 64);
  return await runtime.data.deleteMember(header, {id});
}

/**
 * 添加用户到某部门
 * @param {*} param0 
 */
exports.addMemberToGroup = async function({header, uid, gid}) {
  fmt.required(uid, 'word', 2, 64);
  fmt.required(gid, 'word', 2, 64);
  return await runtime.data.addMemberToGroup(header, {uid, gid});
}

/**
 * 获取用户列表
 * @param {*} params 
 */
exports.listMember = async function({header, ...otherParams}) {
  return await runtime.data.listMember(header, otherParams);
}