const config = {
  listenPort: 15555,
  telegram: {
    accApi: '556787177:AAEosUW01ahm7NVkKkbytzcOuPIwLunqNoU',
  },
  mysql: {
    member: {
      host: 'member.chfigpazak1u.ap-southeast-1.rds.amazonaws.com',
      user: 'horbit',
      password: 'bilbobaggins82!@',
      database: 'master_web',
      port: 43306,
    },
    oneonone: {
      host: 'member.chfigpazak1u.ap-southeast-1.rds.amazonaws.com',
      user: 'horbit',
      password: 'bilbobaggins82!@',
      database: 'oneonone',
      port: 43306,
    },
  },
  imageUrl: 'http://imgst.bitholic.com/staging/2factor/',
}

export default config
