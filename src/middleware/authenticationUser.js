import Jwt from "jsonwebtoken"


const authentication = (req, res, next) => {
  const authHerades = req.headers.authorization
  if (!authHerades || !authHerades.startsWith('Bearer ')) {
    res.status(400).json({ Error: "Token not provided" })
  } else {
    const token = authHerades.split(' ')[1]
    try {
      Jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch (error) {
      res.status(401).json({ Error: "Incorret Token" })
    }
  }
}

export default authentication;