// 1. IMPORT YOUR DEPENDENCIES
const express = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
const port = 8000


// 1.5 CONFIGURE YOUR MONGOOSE
require("./config/mongoose.config")



// 2. CONFIGURE YOUR EXPRESS
app.use(cookieParser())
app.use(cors({credentials:true , origin:"http://localhost:3000"})) // ALLOWS FOR REACT/EXPRESS TO COMMUNICATE
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// 3. ATTACH ROUTES TO YOUR EXPRESS SERVER
// require("./routes/gamer.route")(app)
const gamerRoutes = require("./routes/gamer.route")
gamerRoutes(app)


// 4. RUN YOUR EXPRESS SERVER
app.listen(port, () => console.log(`LOCKED AND LOADED ${port}`))