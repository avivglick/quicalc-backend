const express = require("express");
const cors = require("cors");
//const dotenv = require('dotenv')
//const path = require('path')

const http = require("http");
const getFilledForm = require("./pricingService");
const PORT = 4000;

const app = express();
const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// })

app.use(cors());
app.use(express.json());

//app.use(express.static(path.resolve(__dirname, 'public')))
// if (process.env.NODE_ENV === 'production') {
//   console.log('hey')
// } else {
//   console.log('bey')
//   const corsOptions = {
//     origin: [
//       'http://127.0.0.1:8080',
//       'http://localhost:8080',
//       'http://127.0.0.1:3000',
//       'http://localhost:3000',
//     ],
//     credentials: true,
//   }
//   app.use(cors(corsOptions))
// }

app.post("/form-prices", (req, res) => {
  const resolvedForm = req.body;
  const result = getFilledForm(resolvedForm);
  res.send(result);
});

//app.use('/api/vacation', vacationRouter)
//app.use('/api/user', userRouter)

server.listen(PORT, () => console.log(`Serveriy is up at ${PORT}`));
