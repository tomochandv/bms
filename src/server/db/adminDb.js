import mysql from 'mysql2/promise'
import moment from 'moment'
import config from '../../../config'

const oneononePool = mysql.createPool(config.mysql.oneonone)

const db = {
  // 관리자 리스트 조회
  adminList: async () => {
    const qry = 'select * from admin_user'
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // 관리자 아이디에 따른 상세 정보 조회
  adminDetail: async (userId) => {
    const qry = `select * from admin_user where userid = ${userId}`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // 관리자 저장
  adminAdd: async (id, pass, name, email, tell, grade, teleName) => {
    const qry = `insert into admin_user(userid, userpwd, name, email, tell, reg_date, admin_grade, tele_name) 
    values('${id}', '${pass}', '${name}', '${email}', '${tell}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '${grade}', '${teleName}')`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // 관리자 등급 업데이트
  adminUpdate: async (grade, idx) => {
    const qry = `update admin_user set 
    admin_grade = '${grade}', up_date = '${moment().format('YYYY-MM-DD HH:mm:ss')}'
    where idx = ${idx}`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // 관리자 텔레그램 코드 업데이트
  adminTelegramIdUpdate: async (telegramId, telegramCode) => {
    const qry = `update admin_user set 
      tele_id = '${telegramCode}'
    where tele_name = '${telegramId}'`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // 관리자 아이디, 비밀번호 에 따른 조회
  adminLogin: async (userId, pass) => {
    const qry = `select * from admin_user where userid = '${userId}' and userpwd='${pass}' and admin_grade != 'O'`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // 관리자 비밀번호 변경
  adminPwd: async (idx, pass) => {
    const qry = `update admin_user set userpwd = '${pass}' where idx = ${idx}`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
}

export default db
