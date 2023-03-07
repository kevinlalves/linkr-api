import {db} from '../database/database.connection.js'

export async function validateToken(req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')
    if (!token) return res.status(401).send("Informe o token!")

  try {
    const session = await db.query(`SELECT * FROM session WHERE token = $1;`, [token])
    if (!session) return res.status(401).send("Você não tem autorização")

    res.locals.sessao = session

    console.log("Sucesso no token")

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}
