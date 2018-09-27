/**
 * login
 *
 * @module src/client/modules/login
 */
import axios from 'axios'
import $ from 'jquery'

// 글로벌 ajax 실행시 로딩 이미지 보여 주기.
axios.interceptors.request.use((config) => {
  $('#loading').show()
  return config
})
// 글로벌 ajax 실행시 로딩 이미지 보여 닫기.
axios.interceptors.response.use((response) => {
  $('#loading').hide()
  return response
})

const ajax = {
  login: {
    // 아이디 비밀번호 체크
    loginProc: async (uid, upwd) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/login',
          data: {
            id: uid,
            pwd: upwd,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 텔레그램 인증 번호 체크
    telegramCheck: async (uid, upwd, betweenCode) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/telegramCheck',
          data: {
            id: uid,
            pwd: upwd,
            between: betweenCode,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
  },
  qa: {
    // 답변이 안달린 게시물 카운트 가져오기
    unreadCount: async () => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/qa/unreadCount',
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 총 게시물 카운트 가져오기
    total: async (uemail, uType, uSdate, uEdate) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/qa/count',
          data: {
            email: uemail,
            isComplete: uType,
            sdate: uSdate,
            edate: uEdate,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // QA 리스트 가져요기
    list: async (uemail, uType, uSdate, uEdate, uPage) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/qa/listData',
          data: {
            email: uemail,
            isComplete: uType,
            sdate: uSdate,
            edate: uEdate,
            page: uPage,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 답변 저장
    write: async (no, txt) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/qa/write',
          data: {
            idx: no,
            content: txt,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
  },
  admin: {
    // 관리자 추가
    add: async (uid, uname, uemail, upwd, ugrade, telegramId) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/admin/add',
          data: {
            id: uid,
            name: uname,
            email: uemail,
            pwd: upwd,
            grade: ugrade,
            teleName: telegramId,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 관리자 등급 수정
    update: async (idx, ugrade) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/admin/update',
          data: {
            id: idx,
            grade: ugrade,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 관리자 비밀번호 수정
    pwd: async (id, pass) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/admin/pwd',
          data: {
            idx: id,
            pwd: pass,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 관리자 텔레그램 코드 싱크 맞추기
    telegramSync: async () => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/admin/tele',
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
  },
  secondAuth: {
    // 2차인증 상태에 따른 카운트 가져오기
    statusCount: async (ustatus) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/secondAuth/status',
          data: {
            status: ustatus,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 2차인증 총 게시물 수 카운트
    total: async (uemail, ustatus, uSdate, uEdate) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/secondAuth/count',
          data: {
            email: uemail,
            status: ustatus,
            sdate: uSdate,
            edate: uEdate,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 2차인증 리스트
    list: async (uemail, ustatus, uSdate, uEdate, uPage) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/secondAuth/list',
          data: {
            email: uemail,
            status: ustatus,
            sdate: uSdate,
            edate: uEdate,
            page: uPage,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 2차 인증 상태 수정
    modify: async (ureqNo, ustatus, umemo, umbno) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/secondAuth/modify',
          data: {
            reqNo: ureqNo,
            status: ustatus,
            memo: umemo,
            mbNo: umbno,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
    // 회원 레벨 강등
    levelModify: async (umbNo, ulevel) => {
      let res
      try {
        res = await axios({
          method: 'post',
          url: '/secondAuth/level',
          data: {
            mbNo: umbNo,
            level: ulevel,
          },
        })
      } catch (err) {
        console.log(err)
        return false
      }
      return res.data
    },
  },
}

export default ajax
