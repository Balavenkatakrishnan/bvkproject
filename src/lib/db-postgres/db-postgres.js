const enableQueryLogger = process.env.DATABASE_ENABLE_QUERY_LOGS === 'true' || false

let receive
if (enableQueryLogger) {
  receive = function (data, result, e) {
    if (result.command === 'SELECT' || result.command === 'INSERT' || result.command === 'DELETE' || result.command === 'UPDATE') {
      const queryStr = JSON.stringify(e.query)
      console.log(`DBQUERYLOG: duration: ${result.duration} - rows: ${result.rowCount} - query: ${queryStr}`)
    } else {
      console.log(`DBQUERYLOG: duration: ${result.duration} - ${result.command}`)
    }
  }
}

const pgp = require('pg-promise')({
    receive,
    error: (err, e) => {
      err.eventContext = e
    }
  })

  
const config = {
    connectionString: 'postgres://wckapwayphfldu:2b0e2347333324399ee1a400bcb671fa924b12a9d038b8b58666a9bf26295ae1@ec2-3-209-124-113.compute-1.amazonaws.com:5432/dcbj4p4r8g50vq',
  max: 30,
 ssl: {
    rejectUnauthorized: false,
}
}

const db = pgp(config)

//const db = pgp('postgres://postgres:root@localhost:5432/home-serve', {})
const pgpHelpers = pgp.helpers
pgp.pg.types.setTypeParser(20, parseInt);
module.exports = {
  db, pgpHelpers
}
