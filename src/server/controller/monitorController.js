import NodeSsh from 'node-ssh'

const ssh = new NodeSsh()

const server = [
  {
    name: '웹1',
    host: '10.10.4.159',
    username: 'bitholic',
    password: 'snsqntlrp123!@#',
    type: 'web',
    status: false,
    service: [
      {
        name: '비트홀릭',
        exec: '/usr/bin/curl -I -L https://www.bitholic.com',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: '지갑유효성 체크',
        exec: '/usr/bin/curl -I -L 127.0.0.1:3008',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: '2차인증 파일 업로드',
        exec: '/usr/bin/curl -I -L 127.0.0.1:3001',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: '비트홀릭 Rest Api',
        exec: '/usr/bin/curl -I -L mail.bitholic.com',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: 'Redis[member]',
        exec: '/usr/bin/redis-cli -h member.dhoo2q.0001.apse1.cache.amazonaws.com -p 6379 ping',
        okSign: 'PONG',
        okType: '+',
        status: false,
      },
      {
        name: 'Redis[ticker]',
        exec: '/usr/bin/redis-cli -h ticker.dhoo2q.0001.apse1.cache.amazonaws.com -p 6379 ping',
        okSign: 'PONG',
        okType: '+',
        status: false,
      },
      {
        name: 'Mysql[member]',
        exec: '/usr/bin/mysqladmin --user=horbit --password=\'bilbobaggins82!@\' --host=member.chfigpazak1u.ap-southeast-1.rds.amazonaws.com -P43306 status',
        okSign: 'error',
        okType: '-',
        status: false,
      },
      {
        name: 'Mysql[ticker]',
        exec: '/usr/bin/mysqladmin --user=horbit --password=\'bilbobaggins82!@\' --host=ticker.chfigpazak1u.ap-southeast-1.rds.amazonaws.com -P43306 status',
        okSign: 'error',
        okType: '-',
        status: false,
      },
      {
        name: 'Mysql[point]',
        exec: '/usr/bin/mysqladmin --user=horbit --password=\'bilbobaggins82!@\' --host=point.chfigpazak1u.ap-southeast-1.rds.amazonaws.com -P43306 status',
        okSign: 'error',
        okType: '-',
        status: false,
      },
    ],
  },
  {
    name: '웹2',
    host: '10.10.4.194',
    username: 'bitholic',
    password: 'snsqntlrp123!@#',
    type: 'web',
    status: false,
    service: [
      {
        name: '비트홀릭',
        exec: '/usr/bin/curl -I -L https://www.bitholic.com',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: '지갑유효성 체크',
        exec: '/usr/bin/curl -I -L 127.0.0.1:3008',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: '2차인증 파일 업로드',
        exec: '/usr/bin/curl -I -L 127.0.0.1:3001',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: '비트홀릭 Rest Api',
        exec: '/usr/bin/curl -I -L mail.bitholic.com',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
      {
        name: 'Redis[member]',
        exec: '/usr/bin/redis-cli -h member.dhoo2q.0001.apse1.cache.amazonaws.com -p 6379 ping',
        okSign: 'PONG',
        okType: '+',
        status: false,
      },
      {
        name: 'Redis[ticker]',
        exec: '/usr/bin/redis-cli -h ticker.dhoo2q.0001.apse1.cache.amazonaws.com -p 6379 ping',
        okSign: 'PONG',
        okType: '+',
        status: false,
      },
      {
        name: 'Mysql[member]',
        exec: '/usr/bin/mysqladmin --user=horbit --password=\'bilbobaggins82!@\' --host=member.chfigpazak1u.ap-southeast-1.rds.amazonaws.com -P43306 status',
        okSign: 'error',
        okType: '-',
        status: false,
      },
      {
        name: 'Mysql[ticker]',
        exec: '/usr/bin/mysqladmin --user=horbit --password=\'bilbobaggins82!@\' --host=ticker.chfigpazak1u.ap-southeast-1.rds.amazonaws.com -P43306 status',
        okSign: 'error',
        okType: '-',
        status: false,
      },
      {
        name: 'Mysql[point]',
        exec: '/usr/bin/mysqladmin --user=horbit --password=\'bilbobaggins82!@\' --host=point.chfigpazak1u.ap-southeast-1.rds.amazonaws.com -P43306 status',
        okSign: 'error',
        okType: '-',
        status: false,
      },
    ],
  },
  {
    name: '관리자',
    host: '10.10.4.5',
    username: 'bitholic',
    password: 'snsqntlrp123!@#',
    type: 'web',
    status: false,
    service: [
      {
        name: '관리자사이트',
        exec: '/usr/bin/curl -I -L bh.rdmchain.adm',
        okSign: '200 OK',
        okType: '+',
        status: false,
      },
    ],
  },
  {
    name: 'ticker1',
    host: '10.10.6.44',
    username: 'bitholic',
    password: 'snsqntlrp123!@#',
    type: 'ticker',
    status: false,
    service: {
      exec: '/usr/local/bin/forever list',
      targert: [
        {
          name: 'SyncTradePoint_btc_ltc',
          status: false,
        },
        {
          name: 'TickerServer_btc_ltc',
          status: false,
        },
        {
          name: 'TradePointServer_btc_ltc',
          status: false,
        },
        {
          name: 'SyncTradePoint_btc_bch',
          status: false,
        },
        {
          name: 'TickerServer_btc_bch',
          status: false,
        },
        {
          name: 'TradePointServer_btc_bch',
          status: false,
        },
        {
          name: 'SyncTradePoint_btc_wax',
          status: false,
        },
        {
          name: 'TickerServer_btc_wax',
          status: false,
        },
        {
          name: 'TradePointServer_btc_wax',
          status: false,
        },
      ],
    },
  },
  {
    name: 'ticker2',
    host: '10.10.6.41',
    username: 'bitholic',
    password: 'snsqntlrp123!@#',
    type: 'ticker',
    status: false,
    service: {
      exec: '/usr/local/bin/forever list',
      targert: [
        {
          name: 'SyncTradePoint_btc_etc',
          status: false,
        },
        {
          name: 'TickerServer_btc_etc',
          status: false,
        },
        {
          name: 'TradePointServer_btc_etc',
          status: false,
        },
        {
          name: 'SyncTradePoint_btc_eth',
          status: false,
        },
        {
          name: 'TickerServer_btc_eth',
          status: false,
        },
        {
          name: 'TradePointServer_btc_eth',
          status: false,
        },
        {
          name: 'SyncTradePoint_btc_tusd',
          status: false,
        },
        {
          name: 'TickerServer_btc_tusd',
          status: false,
        },
        {
          name: 'TradePointServer_btc_tusd',
          status: false,
        },
      ],
    },
  },
  {
    name: 'ticker3',
    host: '10.10.6.183',
    username: 'bitholic',
    password: 'snsqntlrp123!@#',
    type: 'ticker',
    status: false,
    service: {
      exec: '/usr/local/bin/forever list',
      targert: [
        {
          name: 'SyncTradePoint_btc_medx',
          status: false,
        },
        {
          name: 'TickerServer_btc_medx',
          status: false,
        },
        {
          name: 'TradePointServer_btc_medx',
          status: false,
        },
        {
          name: 'SyncTradePoint_qtum_bch',
          status: false,
        },
        {
          name: 'TickerServer_qtum_bch',
          status: false,
        },
        {
          name: 'TradePointServer_qtum_bch',
          status: false,
        },
        {
          name: 'SyncTradePoint_qtum_btc',
          status: false,
        },
        {
          name: 'TickerServer_qtum_btc',
          status: false,
        },
        {
          name: 'TradePointServer_qtum_btc',
          status: false,
        },
        {
          name: 'SyncTradePoint_qtum_ltc',
          status: false,
        },
        {
          name: 'TickerServer_qtum_ltc',
          status: false,
        },
        {
          name: 'TradePointServer_qtum_ltc',
          status: false,
        },
        {
          name: 'SyncTradePoint_qtum_med',
          status: false,
        },
        {
          name: 'TickerServer_qtum_med',
          status: false,
        },
        {
          name: 'TradePointServer_qtum_med',
          status: false,
        },
      ],
    },
  },
  {
    name: 'ticker4',
    host: '10.10.6.240',
    username: 'bitholic',
    password: 'snsqntlrp123!@#',
    type: 'ticker',
    status: false,
    service: {
      exec: '/usr/local/bin/forever list',
      targert: [
        {
          name: 'SyncTradePoint_qtum_etc',
          status: false,
        },
        {
          name: 'TickerServer_qtum_etc',
          status: false,
        },
        {
          name: 'TradePointServer_qtum_etc',
          status: false,
        },
        {
          name: 'SyncTradePoint_qtum_eth',
          status: false,
        },
        {
          name: 'TickerServer_qtum_eth',
          status: false,
        },
        {
          name: 'TradePointServer_qtum_eth',
          status: false,
        },
        {
          name: 'SyncTradePoint_btc_bbt',
          status: false,
        },
        {
          name: 'TickerServer_btc_bbt',
          status: false,
        },
        {
          name: 'TradePointServer_btc_bbt',
          status: false,
        },
      ],
    },
  },
]

const logic = {
  webServiceCheck: async (list, sshCon) => {
    for (const service of list.service) {
      try {
        const result = await sshCon.execCommand(service.exec)
        if (service.okType === '+') {
          service.status = result.stdout.indexOf(service.okSign) > -1 ? true : false
        } else {
          service.status = result.stdout.indexOf(service.okSign) < 0 ? true : false
        }
      } catch (err) {
        console.log(err)
        service.status = false
      }
    }
  },
  tickerServiceCheck: async (list, sshCon) => {
    const result = await sshCon.execCommand(list.service.exec)
    const arrResult = result.stdout.split('\n')

    for (const resultData of arrResult) {
      for (const target of list.service.targert) {
        try {
          if (resultData.indexOf(target.name) > -1) {
            target.status = resultData.indexOf('STOP') === -1 ? true : false
          }
        } catch (err) {
          console.log(err)
          target.status = false
        }
      }
    }
  },
}

const controller = {
  serverStatus: async (ctx) => {
    for (const list of server) {
      try {
        const sshCon = await ssh.connect({
          host: list.host,
          username: list.username,
          password: list.password,
          readyTimeout: 1000,
        })
        if (list.type === 'web') {
          await logic.webServiceCheck(list, sshCon)
        } else {
          await logic.tickerServiceCheck(list, sshCon)
        }
        list.status = true
      } catch (err) {
        list.status = false
        console.log(err)
      }
    }
    ctx.body = server
  },
}

export default controller
