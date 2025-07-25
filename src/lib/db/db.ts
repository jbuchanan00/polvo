import pkg from 'pg'
const {Pool} = pkg
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

export const connectToDB = () => pool.connect();