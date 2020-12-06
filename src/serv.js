'use strict';

const { libs, runtime } = nodex;
const { http } = libs;
const { logic } = runtime;

exports.init = async function (args) {
  const proxy = (func) => {
    return function (ctx) {
      return http.handler( async (params) => {
        return await func({
          ...params,
          header: ctx.header
        })
      })(ctx)
    }
  }
  const app = http.webapp(args);

  app.route(router => {
    router.post('/create_group', proxy(logic.createGroup));
    router.post('/update_group', proxy(logic.updateGroup));
    router.post('/delete_group', proxy(logic.deleteGroup));
    router.post('/get_group_list_by_gid', proxy(logic.getGroupListByGid));
    router.post('/get_member_list_by_gid', proxy(logic.getMemberListByGid));
    router.post('/create_member', proxy(logic.createMember));
    router.post('/update_member', proxy(logic.updateMember));
    router.post('/delete_member', proxy(logic.deleteMember));
    router.post('/add_member_to_group', proxy(logic.addMemberToGroup));
    router.post('/list_member', proxy(logic.listMember));
  });

  app.start();
};

