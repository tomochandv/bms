import mysql from 'mysql2/promise'
import moment from 'moment'
import config from '../../../config'

const oneononePool = mysql.createPool(config.mysql.oneonone)

const db = {
  // Q&A 리스트 조회
  qaList: async (email, isComplete, startDate, endDate, start, offset) => {
    const qry = `select distinct
      a.idx, a.pidx, a.seq, a.mb_no, a.email, a.name, a.b_type, a.content, a.reg_date
    , case when a.b_category = 0 then '일반질문' when a.b_category = 1 then '거래' when a.b_category = 2 then '입출금'
        when a.b_category = 3 then '제휴/제안' when a.b_category = 4 then '이벤트' when a.b_category = 5 then '회원정보' else '기타' end as b_category
    , bb.counti , cc.iscomplete
    from board a
    left outer join (select b.pidx, count(1) as counti from board b group by b.pidx) bb on a.idx = bb.pidx
    left outer join board cc on a.idx = cc.pidx
    where a.pidx = 0 and a.reg_date between '${startDate} 00:00:00' and '${endDate} 23:59:59'
    and (a.email like '${email}%' or a.mb_no = '${email}' or a.name like '${email}%') and (a.iscomplete like '%${isComplete}%' or cc.iscomplete like '%${isComplete}%')
    order by a.idx desc 
    limit ${start}, ${offset}`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // Q&A 총 카운트 조회
  qaCount: async (email, isComplete, startDate, endDate) => {
    const qry = `select count(1) as counti from board  
    where pidx = 0 and reg_date between '${startDate} 00:00:00' and '${endDate} 23:59:59'
    and (email like '${email}%' or mb_no = '${email}') and iscomplete like '%${isComplete}%'`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // QA idx 번호의 상세 조회
  qaDetail: async (idx) => {
    const qry = `select * from board where (idx = ${idx} or pidx = ${idx})  order by seq`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // QA idx 에 대한 상위 seq 조회
  getMaxSeq: async (idx) => {
    const qry = `select max(seq) + 1 as seq from board where (idx = ${idx} or pidx = ${idx})`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // QA 저장
  qaAdd: async (idx, pidx, seq, answer, mbNo, email, name) => {
    const qry = `insert into board (pidx, seq, mb_no, email, name, b_category, b_type, content, reg_date, iscomplete)
    values(${pidx > 0 ? pidx : idx}, ${seq}, '${mbNo}', '${email}', '${name}', '', 'A' ,'${answer}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', 'Y')`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // QA 업데이트
  qaUpdate: async (idx) => {
    const qry = `update board set iscomplete = 'Y' WHERE idx = ${idx}`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // QA 업데이트
  qaParentUpdate: async (idx) => {
    const qry = `update board set iscomplete = 'Y' WHERE pidx = ${idx}`
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
  // QA 상태 N 인 총 카운트 조회
  qaUnreadCount: async () => {
    const qry = 'select count(1) as counti from board where iscomplete =\'N\''
    const [rows] = await oneononePool.execute(qry)
    const list = rows
    return list
  },
}

export default db
