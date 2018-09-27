import Router from 'koa-router'
import loginController from '../controller/loginController'
import qaController from '../controller/qaController'
import secondController from '../controller/secondAuthController'
import adminController from '../controller/adminContoller'
import utill from '../utill'

const router = new Router()

router
  // default page
  .get('/', async (ctx, next) => {
    await utill.siteIpCheck(ctx, next)
    await ctx.render('login', { ctxs: ctx })
  })
  // 로그아웃
  .post('/logout', loginController.logout)
  // 로그인 실행
  .post('/login', loginController.login)
  // 텔레그램 인증 실행
  .post('/telegramCheck', loginController.betweenTelegramAuth)
  // QA 리스트
  .get('/qa/list', async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    await ctx.render('qa/list', {
      ctxs: ctx,
      status: '',
      email: '',
      sdate: '',
      edate: '',
    })
  })
  // QA 조건 포함 리스트
  .get('/qa/list/:status/:email/:sdate/:edate', async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    await ctx.render('qa/list', {
      ctxs: ctx,
      status: ctx.params.status === 'FF' ? '' : ctx.params.status,
      email: ctx.params.email === 'FF' ? '' : ctx.params.email,
      sdate: ctx.params.sdate,
      edate: ctx.params.edate,
    })
  })
  // QA 상세 페이지
  .get('/qa/detail/:idx/:status/:email/:sdate/:edate', qaController.qaDetail)
  // QA 읽지않은 리스트 카운트
  .post('/qa/unreadCount', qaController.qaUnreadCount)
  // QA 총 리스트 데이터
  .post('/qa/listData', qaController.qaList)
  // QA총 게시물 카운트
  .post('/qa/count', qaController.qaTotalCount)
  // QA 저장
  .post('/qa/write', qaController.qaAdd)
  // 관리자 리스트
  .get('/admin/list', adminController.adminList)
  // 관리자 추가
  .post('/admin/add', adminController.adminAdd)
  // 관리자 수정
  .post('/admin/update', adminController.adminUpdate)
  // 관리자 비밀번호 변경
  .post('/admin/pwd', adminController.adminPwdChanged)
  // 관리자 텔레그램 싱크
  .post('/admin/tele', adminController.telegRamBotGetUpdate)
  // 2차인증 리스트
  .get('/secondAuth/list', async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    await ctx.render('secondAuth/list', {
      ctxs: ctx,
      status: '',
      email: '',
      sdate: '',
      edate: '',
    })
  })
  // 2차인증 조건 포함 리스트
  .get('/secondAuth/list/:status/:email/:sdate/:edate', async (ctx, next) => {
    await utill.siteAuthCheck(ctx, next)
    await ctx.render('secondAuth/list', {
      ctxs: ctx,
      status: ctx.params.status === 'FF' ? '' : ctx.params.status,
      email: ctx.params.email === 'FF' ? '' : ctx.params.email,
      sdate: ctx.params.sdate,
      edate: ctx.params.edate,
    })
  })
  // 2차인증 상세
  .get('/secondAuth/detail/:idx/:status/:email/:sdate/:edate', secondController.detail)
  // 2차 인증 리스트 데이터
  .post('/secondAuth/list', secondController.list)
  // 2차 인증 게시물 수
  .post('/secondAuth/count', secondController.count)
  // 2차 인증 상태 변경
  .post('/secondAuth/modify', secondController.modifyMember)
  // 2차 인증 상태 카운트
  .post('/secondAuth/status', secondController.statusCount)
  // 2차 인증 레벨 변경
  .post('/secondAuth/level', secondController.webMemberLevelModify)

export default router
