import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
})
