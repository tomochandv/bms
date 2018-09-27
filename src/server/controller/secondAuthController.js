import moment from 'moment'
import db from '../db/sencondAuthDb'
import utill from '../utill'
import config from '../../../config'

const controller = {
  // 2차인증 리스트를 구한다.
  list: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const currentPage = ctx.request.body.page
    const start = parseInt((currentPage - 1) * 20, 10)

    const result = await db.list(ctx.request.body.status,
      ctx.request.body.email, ctx.request.body.sdate, ctx.request.body.edate, start, 20)
    ctx.body = result
  },
  // 2차인증 리스트의 총 카운트를 구한다.
  count: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.count(ctx.request.body.status,
      ctx.request.body.email, ctx.request.body.sdate, ctx.request.body.edate)
    ctx.body = result[0].counti
  },
  // 2차인증 조건(상태) 카운트를 구한다.
  statusCount: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.statusCount(ctx.request.body.status)
    ctx.body = result[0].counti
  },
  // 2차인증 상태를 변경 한다.
  modifyMember: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    let result = 0
    let modifyResult1 = []
    const modifyResult = await db.modifyMember(ctx.request.body.reqNo,
      ctx.request.body.status, ctx.request.body.memo.replace(/'/g, '\'\''))
    if (ctx.request.body.status === 'Y') {
      modifyResult1 = await db.webMemberModify(ctx.request.body.mbNo, 2)
    }
    result += modifyResult.affectedRows + modifyResult1
    ctx.body = result
  },
  // 2차인증 리스트에서 선택한 행의 상세 값을 구한다.
  detail: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.detail(ctx.params.idx)
    await ctx.render('secondAuth/detail', {
      data: result[0],
      moments: moment,
      no: ctx.params.idx,
      ctxs: ctx,
      imgUrl: config.imageUrl,
      email: ctx.params.email,
      sdate: ctx.params.sdate,
      edate: ctx.params.edate,
      status: ctx.params.status,
    })
  },
  // 2차 인증 레벨 변경
  webMemberLevelModify: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.webMemberModify(ctx.request.body.mbNo, ctx.request.body.level)
    ctx.body = result.affectedRows
  },
}

export default controller
