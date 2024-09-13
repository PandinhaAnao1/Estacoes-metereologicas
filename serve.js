import app from './src/app.js'
import * as dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT || 3060;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})

// executar node server.js ou  npm run dev
