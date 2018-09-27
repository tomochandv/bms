const utill = {
  // 텔레그램 인증 코드 생성
  createKey: () => {
    const chars = '01233456789'
    let randomstring = ''
    for (let i = 0; i < 8; i += 1) {
      const rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
  },
  // 로그인 유효성 체크 하는 미들웨어
  siteAuthCheck: async (ctx, next) => {
    const id = ctx.session.userid
    const clientIp = ctx.request.ip
    if (id === undefined || id === '' || id === null || clientIp === '59.10.53.205') {
      await ctx.redirect('/')
    } else {
      await next()
    }
  },
  // default 페이지 사내 IP 일시 구글로 리다이렉트
  siteIpCheck: async (ctx, next) => {
    const clientIp = ctx.request.ip
    if (clientIp === '59.10.53.205') {
      await ctx.redirect('https://google.com')
    } else {
      await next()
    }
  },
}

export default utill
