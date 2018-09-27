import mysql from 'mysql2/promise'
import config from '../../../config'

const memberPool = mysql.createPool(config.mysql.member)

const db = {
  // 2차인증 리스트 조회
  list: async (status, email, sdate, edate, start, offset) => {
    const qry = `select a.*, b.mb_name, b.mb_level 
    , case when a.admin_confirm = 'Y' then '인증' when a.admin_confirm = 'N' then '미인증' when a.admin_confirm = 'R' then '거부' end as confirm
    from web_member_level_request a inner join web_member b on a.mb_no = b.mb_no
    where a.req_dt between '${sdate} 00:00:00' and '${edate} 23:59:59'
    and (a.mb_no = '${email}' or a.mb_id like '${email}%' or b.mb_name like '${email}%')
    and a.admin_confirm like '%${status}%'
    order by req_no desc limit ${start} , ${offset}`

    const [rows] = await memberPool.execute(qry)
    const list = rows
    return list
  },
  // 2차인증 리스트 총 카운트 조회
  count: async (status, email, sdate, edate) => {
    const qry = `select count(1) as counti from web_member_level_request a inner join web_member b on a.mb_no = b.mb_no
    where a.req_dt between '${sdate} 00:00:00' and '${edate} 23:59:59'
    and (a.mb_no = '${email}' or a.mb_id like '${email}%' or b.mb_name like '${email}%')
    and a.admin_confirm like '%${status}%'`

    const [rows] = await memberPool.execute(qry)
    const list = rows
    return list
  },
  // 2차인증 상태에 따른 카운트 조회
  statusCount: async (status) => {
    const qry = `select count(1) as counti from web_member_level_request where admin_confirm = '${status}'`
    const [rows] = await memberPool.execute(qry)
    const list = rows
    return list
  },
  // 2차인증 상세 조회
  detail: async (reqId) => {
    const qry = `select a.*, b.mb_name, b.mb_level from web_member_level_request a inner join web_member b on a.mb_no = b.mb_no where a.req_no = ${reqId}`
    const [rows] = await memberPool.execute(qry)
    const list = rows
    return list
  },
  // 2차인증 상태, 관리자 메모 수정
  modifyMember: async (reqNo, status, memo) => {
    const qry = `update web_member_level_request set 
    admin_confirm = '${status}',
    admin_confirm_dt = now(),
    admin_memo = '${memo}'
    where req_no = ${reqNo}`
    const [rows] = await memberPool.execute(qry)
    const list = rows
    return list
  },
  // 회원 기본정보 level 수정
  webMemberModify: async (mbNo, level) => {
    const qry = `update web_member set mb_level = '${level}' where mb_no = '${mbNo}'`
    const [rows] = await memberPool.execute(qry)
    const list = rows
    return list
  },
}

export default db
