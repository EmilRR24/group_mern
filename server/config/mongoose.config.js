const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/gamers",{
    useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(()=> console.log("CONNECTED TO GAMERS"))
.catch(err => console.log("ERROR: ", err))