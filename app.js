
const express = require('express')
const cors = require('cors')
const app = express();
const errorHandler = require("./middleware/errorHandler.js")



app.use(cors())
app.use(express.json())

//DB Connection
const conn = require("./db/conn")
conn()

//Routes
const routes = require("./routes/router")

app.use('/api', routes);


app.use(errorHandler)

app.listen(3333, () => {
    console.log("Servidor Inicializado")
})

app.get("/" , (req, res) => {
    res.send("servidor inicializado")
})



