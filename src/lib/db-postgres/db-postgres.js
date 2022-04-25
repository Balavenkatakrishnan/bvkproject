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
    connectionString: 'postgres://vdiukcfnzcvrlh:962273636ecda28f2819febb95fc4a305ee0a52d91078a9de9fb17a77533373f@ec2-54-80-122-11.compute-1.amazonaws.com:5432/dfmgsfs1kbju0e',
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
