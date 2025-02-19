import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000;
import userRouter from './routes/user.routes.js';
import bodyParser from 'body-parser';
import connectDB from './db/index.js';

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend to access
  credentials: true, // Allow cookies and credentials
}))
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('Server is on my motherfucking port')
})
connectDB()

.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
.catch((err) => {
  console.log("MongoDB connection fail ",err);
})
const users	= [
    {
        username: 'shuvamkrsahu',
        name : 'Shuvam Kumar Sahu',
        password: 'lel',
        tasks: ["Hilaana", "Muth maarna", "Chut maarana"]
    },
    {
        username: 'hehehe',
        name : 'hehe',
        password: 'lelelel',
        tasks : ["sex karna", "chut maarana", "lund chusna"]
    }]

export {users} 