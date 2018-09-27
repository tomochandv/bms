/*
 로그인 관련된 컨트롤러 koa ctx를 넘겨 받아 진행 한다.
*/
import sha512 from 'js-sha512'
import rp from 'request-promise'
import utf8 from 'utf8'
import db from '../db/adminDb'
import utill from '../utill'

const controller = {
  // 아이디 비밀번호 검사
  login: async (ctx) => {
    let returnMessage = false
    console.log(sha512.sha512(ctx.request.body.pwd))
    console.log(ctx.request.body.pwd)
    const result = await db.adminLogin(ctx.request.body.id,
      sha512.sha512(ctx.request.body.pwd))
    if (result.length > 0) {
      returnMessage = await controller.telegram(ctx, result)
    } else {
      returnMessage = false
    }
    ctx.body = returnMessage
  },
  // 텔레그램 인증 코드 보내기
  telegram: async (ctx, member) => {
    let key = ''
    let result = true
    if (process.env.NODE_ENV === 'development') {
      key = ''
    } else {
      key = utill.createKey()
      const text = utf8.encode(`${member[0].name}님 요청하신 BMS 로그인 인증 번호는 \n ${key} \n 입니다.`)
      const url = `https://api.telegram.org/bot621127172:AAE08cQX2pFHZloA6MJZgPHtzIVWDZdWgJk/sendMessage?chat_id=${member[0].tele_id}&text=${text}`
      result = JSON.parse(await rp(url))
      result = result.ok
    }
    ctx.session.key = key
    return result
  },
  // 텔레그램 인증 코드 비교 검사
  betweenTelegramAuth: async (ctx) => {
    let result = false
    if (ctx.session.key === ctx.request.body.between) {
      const memberInfo = await db.adminLogin(ctx.request.body.id,
        sha512.sha512(ctx.request.body.pwd))
      ctx.session.userid = memberInfo[0].userid
      ctx.session.mbNo = memberInfo[0].mb_no
      ctx.session.name = memberInfo[0].name
      ctx.session.email = memberInfo[0].email
      ctx.session.tell = memberInfo[0].tell
      ctx.session.grade = memberInfo[0].admin_grade
      result = true
    }
    ctx.body = result
  },
  // 로그 아웃
  logout: async (ctx) => {
    ctx.session = null
    ctx.redirect('/')
  },
}

console.log(sha512.sha512('1111'))

export default controller
