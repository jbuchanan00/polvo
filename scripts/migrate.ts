
import dotenv from 'dotenv'
import { exec } from "node:child_process"
import fs from 'fs'

dotenv.config()

function migrateDb() {
    const files = fs.readdirSync('./sql/init')
    //most recent should always flow to the top
    files.sort((a, b) => parseInt(b.split("-")[0]) - parseInt(a.split("-")[0]))
    const file = files[0]

    const dbname = process.env.POSTGRES_DB_POLVO
    const host = process.env.POSTGRES_HOST_POLVO
    const user = process.env.POSTGRES_USER_POLVO
    const pass = process.env.POSTGRES_PASSWORD_POLVO

    const cmd = `PGPASSWORD=${pass} psql -d ${dbname} -U ${user} -h ${host ?? 'localhost'} -f './sql/init/${file}'`

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        }
        console.log('stdout: ', stdout)
        console.log('stderr:', stderr)
    })
}

migrateDb()