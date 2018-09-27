/*
 1:1 문의 관련 컨트롤러
*/
import moment from 'moment'
import db from '../db/qaDb'
import utill from '../utill'

const controller = {
  // 읽지 않은 메세지 카운트를 구한다.
  qaUnreadCount: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.qaUnreadCount()
    ctx.body = result[0].counti
  },
  // 검색조건에 해당하는 리스트를 구한다.
  qaList: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const currentPage = ctx.request.body.page
    const start = parseInt((currentPage - 1) * 20, 10)

    const result = await db.qaList(ctx.request.body.email,
      ctx.request.body.isComplete, ctx.request.body.sdate, ctx.request.body.edate, start, 20)
    ctx.body = result
  },
  // 검색조건에 해당하는 리스트의 총 카운트를 구한다.
  qaTotalCount: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.qaCount(ctx.request.body.email, ctx.request.body.isComplete,
      ctx.request.body.sdate, ctx.request.body.edate)
    ctx.body = result[0].counti
  },
  // 리스트에서 선택한 행의 상세 값을 구한다.
  qaDetail: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const result = await db.qaDetail(ctx.params.idx)
    await ctx.render('qa/detail', {
      data: result,
      moments: moment,
      no: ctx.params.idx,
      ctxs: ctx,
      email: ctx.params.email,
      sdate: ctx.params.sdate,
      edate: ctx.params.edate,
      status: ctx.params.status,
    })
  },
  // 질문에 응답을 저장한다.
  qaAdd: async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    const seq = await db.getMaxSeq(ctx.request.body.idx)
    const result = await db.qaAdd(ctx.request.body.idx, ctx.request.body.idx, seq[0].seq,
      ctx.request.body.content.replace(/'/g, '\'\''), ctx.session.mbNo, ctx.session.email, ctx.session.name)
    const update = await db.qaUpdate(ctx.request.body.idx)
    const parentUpdate = await db.qaParentUpdate(ctx.request.body.idx)
    ctx.body = result.affectedRows + update.affectedRows
  },
}

export default controller
