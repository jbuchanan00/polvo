import pkg from 'pg'
const {Pool} = pkg
import dotenv from 'dotenv'

dotenv.config()

  console.log(process.env.POSTGRES_USER_POLVO, process.env.POSTGRES_HOST_POLVO, process.env.POSTGRES_DB_POLVO, process.env.POSTGRES_PASSWORD_POLVO, process.env.POSTGRES_PORT_POLVO)

const pool = new Pool({
  user: process.env.POSTGRES_USER_POLVO,
  host: process.env.POSTGRES_HOST_POLVO,
  database: process.env.POSTGRES_DB_POLVO,
  password: process.env.POSTGRES_PASSWORD_POLVO,
  port: parseInt(process.env.POSTGRES_PORT_POLVO!)
});

export const connectToDB = () => pool.connect();