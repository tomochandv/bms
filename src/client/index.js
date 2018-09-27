/**
 * client javascript 및 scss 소스 파일
 * webpack을 통해서 dist/ 에 번들링 수행
 */
import './scss/app.scss'
import $ from 'jquery'
import moment from 'moment'
import ajax from './modules/index'
import popover from '../../node_modules/bootstrap/js/src/popover'
import modal from '../../node_modules/bootstrap/js/src/modal'

/**
 * 공통으로 쓰이는 유틸 함수
 */
const utill = {
  charByteSize: (ch) => {
    let result = 0
    if (ch === null || ch.length === 0) {
      result = 0
    }
    const charCode = ch.charCodeAt(0)
    if (charCode <= 0x00007F) {
      result = 1
    } else if (charCode <= 0x0007FF) {
      result = 2
    } else if (charCode <= 0x00FFFF) {
      result = 3
    } else {
      result = 4
    }
    return result
  },
  cutByteLength: (s, len) => {
    if (s === null || s.length === 0) {
      return 0
    }
    let size = 0
    let rIndex = s.length
    for (let i = 0; i < s.length; i += 1) {
      size += utill.charByteSize(s.charAt(i))
      if (size === len) {
        rIndex = i + 1
        break
      } else if (size > len) {
        rIndex = i
        break
      }
    }
    return `${s.substring(0, rIndex)}...`
  },
  copyclip: (txt) => {
    const el = document.createElement('textarea')
    el.value = txt
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  },
}

/**
 * 로그인 부분에서 쓰이는 함수
 */
const login = {
  loginProc: async () => {
    const id = $('#txtid').val()
    const pwd = $('#txtpassword').val()
    if (id === '' || pwd === '') {
      $('.modal-body > p').text('아이디 또는 비밀번호를 입력하세요.')
      $('.modal').modal('show')
      $('.cssload-loader').hide()
    } else {
      const result = await ajax.login.loginProc(id, pwd)
      if (result) {
        $('#hidToken').val(result)
        $('#telegramDiv').slideDown()
        $('.cssload-loader').hide()
      } else {
        $('.cssload-loader').hide()
        $('.modal-body > p').text('아이디 또는 비밀번호가 틀립니다.')
        $('.modal').modal('show')
      }
    }
  },
  telegramCheck: async () => {
    const id = $('#txtid').val()
    const pwd = $('#txtpassword').val()
    const between = $('#txttelegram').val()

    const result = await ajax.login.telegramCheck(id, pwd, between)
    if (result) {
      window.location.href = '/qa/list'
    } else {
      $('.modal-body > p').text('인증번호가 틀립니다.')
      $('.modal').modal('show')
    }
  },
}

/**
 * QA 부분에서 쓰이는 함수
 */
const qa = {
  qaUnreadCount: async () => {
    const count = await ajax.qa.unreadCount()
    $('#badgeCount1').text(count)
  },
  qaList: async (currentPage) => {
    const uemail = $('#txtEmail').val()
    const uisComplete = $('#selisComplete').val()
    const usdate = $('#txtSdate').val()
    const uedate = $('#txtEdate').val()

    const total = await ajax.qa.total(uemail, uisComplete, usdate, uedate)
    const list = await ajax.qa.list(uemail, uisComplete, usdate, uedate, currentPage)

    $('#badgeCount2').text(total)

    const totalPage = Math.ceil(parseInt(total, 10) / 20)
    let options = ''
    for (let i = 1; i <= totalPage; i += 1) {
      options += `<option value="${i}" ${i === parseInt(currentPage, 10) ? 'selected' : ''}>${i}</option>`
    }
    $('#selRows > option').remove()
    $('#selRows').append(options)

    let html = ''
    for (const rows of list) {
      html += `<tr>
       <td style="text-align:center;">${rows.idx}</td>
       <td style="text-align:center;">${rows.b_category}</td>
       <td style="text-align:left; cursor:pointer;" data-id="${rows.idx}"><a href="#">${await utill.cutByteLength(rows.content, 80)}</a></td>
       <td style="text-align:center;" data-toggle="popover" data-content="복사되었습니다.">${rows.mb_no}</td>
       <td style="text-align:center;" data-toggle="popover" data-content="복사되었습니다.">${rows.email}</td>
       <td style="text-align:center;" data-toggle="popover" data-content="복사되었습니다.">${rows.name}</td>
       <td style="text-align:center;">${moment(rows.reg_date).format('YY.MM.DD HH:mm:ss')}</td>
       <td style="text-align:center;">${rows.iscomplete === 'Y' ? '응답' : '미응답'}</td>
       <td style="text-align:center;">${rows.counti}</td>
      </tr>`
    }

    $('table > tbody > tr').remove()
    $('table > tbody').append(html)

    $('table > tbody > tr > td').click(function click() {
      const reqId = $(this).attr('data-id')
      if (reqId !== undefined) {
        const semail = $('#txtEmail').val() === '' ? 'FF' : $('#txtEmail').val()
        const sstatus = $('#selisComplete').val() === '' ? 'FF' : $('#selisComplete').val()
        const ssdate = $('#txtSdate').val()
        const sedate = $('#txtEdate').val()
        window.location.href = `/qa/detail/${reqId}/${sstatus}/${semail}/${ssdate}/${sedate}`
      }
    })
    $('table > tbody > tr > td').dblclick(function clib() {
      const text = $(this).text()
      utill.copyclip(text)
      $(this).popover('show')
      $('.popover').click(function cli() {
        $(this).popover('hide')
      })
    })
  },
  qaWrite: async () => {
    const comment = $('#txtResponse').val()
    const no = $('#hidNo').val()
    if (comment !== '') {
      const result = await ajax.qa.write(no, comment)
      if (parseInt(result, 10) === 2) {
        window.location.href = window.location.pathname
      }
    }
  },
}
/**
 * 관리자에서 쓰이는 함수
 */
const admin = {
  adminWrite: async () => {
    const uid = $('#txtId').val()
    const uname = $('#txtName').val()
    const uemail = $('#txtEmail').val()
    const upwd = $('#txtPwd').val()
    const ugrade = $('#selGrades option:selected').val()
    const telegramId = $('#txtTele').val()

    if (uid === '' || uname === '' || uemail === '' || upwd === '' || ugrade === '' || telegramId === '') {
      $('.alert').fadeIn()
    } else {
      const result = await ajax.admin.add(uid, uname, uemail, upwd, ugrade, telegramId)
      if (parseInt(result, 10) === 1) {
        window.location.href = window.location.pathname
      }
    }
  },
  clickTd: async () => {
    $('table > tbody > tr > td').click(function click() {
      const reqId = $(this).attr('data-id')
      if (reqId !== undefined) {
        $('#hiidIdx').val(reqId)
        $('#modalPwd').modal('show')
      }
    })
  },
  changePwd: async () => {
    const idx = $('#hiidIdx').val()
    const pass1 = $('#pass1').val()
    const pass2 = $('#pass2').val()

    if (pass1 !== '' && pass2 !== '' && pass1 === pass2) {
      const result = await ajax.admin.pwd(idx, pass2)
      if (result > 0) {
        $('#modalPwd').modal('hide')
      } else {
        alert('관리자 비밀번호 변경 실패')
      }
    } else {
      alert('비밀번호가 서로 다릅니다.')
    }
  },
}

/**
 * 2차 인증에서 쓰이는 함수
 */
const secondAuth = {
  status: async () => {
    const count = await ajax.secondAuth.statusCount('N')
    $('#badgeCount1').text(count)
  },
  list: async (currentPage) => {
    const uemail = $('#txtEmail').val()
    const ustatus = $('#selisComplete').val()
    const usdate = $('#txtSdate').val()
    const uedate = $('#txtEdate').val()

    const total = await ajax.secondAuth.total(uemail, ustatus, usdate, uedate)
    const list = await ajax.secondAuth.list(uemail, ustatus, usdate, uedate, currentPage)

    $('#badgeCount2').text(total)

    const totalPage = Math.ceil(parseInt(total, 10) / 20)
    let options = ''
    for (let i = 1; i <= totalPage; i += 1) {
      options += `<option value="${i}" ${i === parseInt(currentPage, 10) ? 'selected' : ''}>${i}</option>`
    }
    $('#selRows > option').remove()
    $('#selRows').append(options)

    let html = ''
    for (const rows of list) {
      html += `<tr>
       <td style="text-align:center; cursor:pointer;" data-id="${rows.req_no}"><a href="#">${rows.req_no}</a></td>
       <td style="text-align:center;" data-toggle="popover" data-content="복사되었습니다.">${rows.mb_no}</td>
       <td style="text-align:center;" data-toggle="popover" data-content="복사되었습니다.">${rows.mb_id}</td>
       <td style="text-align:center;" data-toggle="popover" data-content="복사되었습니다.">${rows.mb_name}</td>
       <td style="text-align:center;">
        <select class="form-control" name="selStatusChange" data-id="${rows.mb_no}">
        <option value="1" ${parseInt(rows.mb_level, 10) === 1 ? 'selected' : ''}>1</option>
        <option value="2" ${parseInt(rows.mb_level, 10) === 2 ? 'selected' : ''}>2</option>
        </select>
       </td>
       <td style="text-align:center;">${rows.confirm}</td>
       <td style="text-align:center;">${moment(rows.req_dt).format('YY.MM.DD HH:mm:ss')}</td>
       <td style="text-align:center;">${moment(rows.admin_confir_dt).format('YY.MM.DD HH:mm:ss')}</td>
      </tr>`
    }

    $('table > tbody > tr').remove()
    $('table > tbody').append(html)
    $('table > tbody > tr > td').click(function click() {
      const reqId = $(this).attr('data-id')
      if (reqId !== undefined) {
        const semail = $('#txtEmail').val() === '' ? 'FF' : $('#txtEmail').val()
        const sstatus = $('#selisComplete').val() === '' ? 'FF' : $('#selisComplete').val()
        const ssdate = $('#txtSdate').val()
        const sedate = $('#txtEdate').val()
        window.location.href = `/secondAuth/detail/${reqId}/${sstatus}/${semail}/${ssdate}/${sedate}`
      }
    })
    $('table > tbody > tr > td').dblclick(function clib() {
      const text = $(this).text()
      utill.copyclip(text)
      $(this).popover('show')
      $('.popover').click(function cli() {
        $(this).popover('hide')
      })
    })

    $('select[name=selStatusChange]').change(async function change() {
      const mbNo = $(this).attr('data-id')
      const level = $(this).val()
      if (parseInt(level, 10) === 2) {
        $(this).val('1')
        $('.modal-body > p').text('인증은 상세 페이지에서 진행해주세요.')
        $('.modal').modal('show')
      } else {
        await ajax.secondAuth.levelModify(mbNo, level)
      }
    })
  },
  modify: async () => {
    const status = $('#selStatus').val()
    const no = $('#hidNo').val()
    const memo = $('#txtMemo').val()
    const mbno = $('#txtmbNo').val()
    const result = await ajax.secondAuth.modify(no, status, memo, mbno)
    if (parseInt(result, 10) > 0) {
      window.location.href = window.location.pathname
    }
  },
}

/**
 * 페이지 로딩시 쓰이는 함수
 */
const pageLoad = {
  login: async () => {
    $('#btnLogin').click(() => {
      $('.cssload-loader').show()
      login.loginProc()
    })
    $('#btnTelegram').click(() => {
      login.telegramCheck()
    })
    $('#txtpassword').on('keypress', (e) => {
      if (e.which === 13) {
        $('.cssload-loader').show()
        login.loginProc()
      }
    })
    $('#txttelegram').on('keypress', (e) => {
      if (e.which === 13) {
        login.telegramCheck()
      }
    })
  },
  qaList: async () => {
    if ($('#txtSdate').val() === '') { $('#txtSdate').val(moment().add(-1, 'M').format('YYYY-MM-DD')) }
    if ($('#txtEdate').val() === '') { $('#txtEdate').val(moment().format('YYYY-MM-DD')) }

    qa.qaUnreadCount()
    qa.qaList(1)

    $('#btnSearch').click(() => {
      qa.qaList(1)
    })
    $('#selRows').change(function change() {
      const currentNum = $(this).val()
      qa.qaList(currentNum)
    })
    $('#txtEmail, #txtEdate').on('keypress', (e) => {
      if (e.which === 13) {
        qa.qaList(1)
        e.preventDefault()
      }
    })
  },
  qaDetail: async () => {
    $('#btnWrite').click(() => {
      qa.qaWrite()
    })
  },
  admin: async () => {
    $('#btnUserAdd').click(() => {
      $('#divAdd').slideToggle()
    })
    $('#btnSave').click(() => {
      admin.adminWrite()
    })
    $('[name=selGrade]').change(async function change() {
      const idx = $(this).attr('data-id')
      const grade = $(this).val()
      await ajax.admin.update(idx, grade)
    })
    $('#btnTele').click(async () => {
      const result = await ajax.admin.telegramSync()
      if (result) {
        window.location.href = window.location.pathname
      }
    })
    $('#btnPwdChanged').click(async () => {
      console.log('a')
      await admin.changePwd()
    })
    await admin.clickTd()
  },
  secondList: async () => {
    if ($('#txtSdate').val() === '') { $('#txtSdate').val(moment().add(-1, 'M').format('YYYY-MM-DD')) }
    if ($('#txtEdate').val() === '') { $('#txtEdate').val(moment().format('YYYY-MM-DD')) }

    secondAuth.status()
    secondAuth.list(1)

    $('#btnSearch').click(() => {
      secondAuth.list(1)
    })
    $('#selRows').change(function change() {
      const currentNum = $(this).val()
      secondAuth.list(currentNum)
    })
    $('#txtEmail, #txtEdate').on('keypress', (e) => {
      if (e.which === 13) {
        secondAuth.list(1)
        e.preventDefault()
      }
    })
  },
  secondDetail: async () => {
    $('#lbelImg1').click(() => {
      $('#divImg1').slideToggle()
    })
    $('#lbelImg2').click(() => {
      $('#divImg2').slideToggle()
    })
    $('#btnSubmit').click(async () => {
      await secondAuth.modify()
    })
  },
}

/**
 * 모든 페이지 로딩시 쓰이는 함수
 */
const page = {
  pageLoad: async () => {
    const url = window.location.pathname
    if (url === '/') {
      // 로그인 페이지
      await pageLoad.login()
    } else if (url.includes('/qa/list')) {
      // 1:1 리스트
      await pageLoad.qaList()
    } else if (url.includes('/qa/detail')) {
      // 1:1 상세
      await pageLoad.qaDetail()
    } else if (url.includes('/admin/list')) {
      // 관리자
      await pageLoad.admin()
    } else if (url.includes('/secondAuth/list')) {
      // 2차인증 리스트
      await pageLoad.secondList()
    } else if (url.includes('/secondAuth/detail')) {
      // 2차인증 디테일
      await pageLoad.secondDetail()
    }
  },
  menuActive: () => {
    const url = window.location.pathname
    if (url.includes('qa')) {
      $('#menu1').addClass('active')
      $('#menu2').removeClass('active')
      $('#menu3').removeClass('active')
    } else if (url.includes('admin')) {
      $('#menu3').addClass('active')
      $('#menu1').removeClass('active')
      $('#menu2').removeClass('active')
    } else if (url.includes('secondAuth')) {
      $('#menu2').addClass('active')
      $('#menu1').removeClass('active')
      $('#menu3').removeClass('active')
    }
  },
}

$(() => {
  page.pageLoad()
  page.menuActive()
})
