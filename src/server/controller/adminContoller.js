/*
 관리자 관련 컨트롤러
*/
import sha512 from 'js-sha512'
import rp from 'request-promise'
import db from '../db/adminDb'
import utill from '../utill'

const controller = {
  // 관리자 리스트를 구한다.
  adminList: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    if (ctx.session.grade === 'S') {
      const list = await db.adminList()
      await ctx.render('admin/list', { data: list, ctxs: ctx })
    } else {
      await ctx.redirect('/qa/list')
    }
  },
  // 관리자를 추가한다.
  adminAdd: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.adminAdd(ctx.request.body.id, sha512.sha512(ctx.request.body.pwd),
      ctx.request.body.name, ctx.request.body.email, '', ctx.request.body.grade, ctx.request.body.teleName)
    ctx.body = result.affectedRows
  },
  // 관리자 상태를 수정한다.
  adminUpdate: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.adminUpdate(ctx.request.body.grade, ctx.request.body.id)
    ctx.body = result.affectedRows
  },
  // 텔레그램 아이디와 코드 싱크를 맞추고 저장한다.
  telegRamBotGetUpdate: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)

    const memberList = await db.adminList()
    const url = 'https://api.telegram.org/bot621127172:AAE08cQX2pFHZloA6MJZgPHtzIVWDZdWgJk/getUpdates'
    const telegramInfo = JSON.parse(await rp(url))
    for (const list of telegramInfo.result) {
      if (list.message.from.username !== undefined) {
        for (const member of memberList) {
          if (member.tele_name === list.message.from.username && (member.tele_id === '' || member.tele_id === null)) {
            await db.adminTelegramIdUpdate(list.message.from.username, list.message.from.id)
          }
        }
      }
    }
    ctx.body = true
  },
  // 관리자 비밀번호를 변경한다.
  adminPwdChanged: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.adminPwd(ctx.request.body.idx, sha512.sha512(ctx.request.body.pwd))
    ctx.body = result.affectedRows
  },
}

export default controller
