import { db } from '../database/database.connection.js'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

export async function createUser(req, res) {
  console.log("rodou createUser (criação de usuario)") //deletar linha depois
  const { username, picture_url, email, password} = req.body
  const passwordHash = bcrypt.hashSync(password, 10);

  const userExist = await db.query(`SELECT * FROM users`)
  userExist.rows.map((u)=>{
    if(u.email === email){
      return res.sendStatus(409)
    }
  })

  try {
    await db.query(`INSERT INTO users (username, picture_url, email, password) VALUES ($1, $2, $3, $4);`, [username, picture_url, email, passwordHash])
    res.sendStatus(201)
  } catch (error) {
    res.status(422).send(error.message)
  }
}

export async function userLogin(req, res) {
  console.log("rodou userLogin (login de usuario)") //deletar linha depois
  const { email, password} = req.body

  const userExist = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
  if(!userExist.rows[0]) return res.status(401).send("usuario ou senha invalidos")
  console.log(userExist.rows[0].id)

  try {
    if(bcrypt.compareSync(password, userExist.rows[0].password)){
      const token = uuidV4()

      await db.query(`INSERT INTO session ("userId", token) VALUES ($1, $2);`, [userExist.rows[0].id, token])

      res.status(200).send({token})
    }else{
      res.status(401).send("usuario ou senha invalidos")
    }
  } catch (error) {
    res.status(422).send(error.message)
  }
}

export async function userMe(req, res) {
  console.log("rodou userMe (buscar informações usuario)") //deletar linha depois

  const session = res.locals.sessao

  try {
    if (!session.rows[0]) return res.status(401).send("Você não está logado!")

    const userExist = await db.query(`SELECT id, name, "visitCount" FROM users WHERE id = $1;`, [session.rows[0].userId])
    const user = userExist.rows[0]

    const shortExist = await db.query(`SELECT id, "shortUrl", url, "visitCount" FROM short WHERE "userId" = ${session.rows[0].userId};`)

    res.status(200).send({
      id: user.id,
      name: user.name,
      visitCount: user.visitCount,
      shortenedUrls: shortExist.rows
    })

  } catch (error) {
    res.status(422).send(error.message)
  }
}

export async function rankingUsers(req, res) {
  console.log("rodou ranking (ranking usuarios)") //deletar linha depois


  try {
    const userExist = await db.query(`
      SELECT users.id, users.name, COUNT(short."userId") AS "linksCount", SUM(short."visitCount") AS "visitCount"
      FROM short
      JOIN users
      ON users.id = short."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10`
    )

    const user = userExist.rows

    res.status(200).send(user)

  } catch (error) {
    res.status(422).send(error.message)
  }
}
