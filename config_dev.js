const config = {
  listenPort: 15555,
  telegram: {
    accApi: '556787177:AAEosUW01ahm7NVkKkbytzcOuPIwLunqNoU',
  },
  mysql: {
    member: {
      host: 'dev.chfigpazak1u.ap-southeast-1.rds.amazonaws.com',
      user: 'Devbitholic',
      password: 'dhsmfqkaeh',
      database: 'master_web',
      port: 3306,
    },
    oneonone: {
      host: 'dev.chfigpazak1u.ap-southeast-1.rds.amazonaws.com',
      user: 'Devbitholic',
      password: 'dhsmfqkaeh',
      database: 'oneonone',
      port: 3306,
    },
  },
  imageUrl: 'http://imgst.bitholic.com/dev/2factor/',
}

export default config
