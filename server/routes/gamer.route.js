const GamerController = require("../controllers/gamers.controller")
const {authenticate} = require("../config/jwt.config")


module.exports = app => {
    // TEST SCREEN
    app.get("/api/gamers/test", GamerController.test);
    // CREATE GAMER
    app.post("/api/gamers/new", GamerController.create);
    // GET ALL GAMER WITH PROTECTED ROUTE
    app.get("/api/gamers", authenticate, GamerController.allGamers);
    // GET ONE GAMER
    app.get("/api/gamers/:gamer_id", GamerController.oneGamer);
    // EDIT GAMER
    app.put("/api/gamers/:gamer_id", GamerController.updateGamer);
    // DELETE GAMER
    app.delete("/api/gamers/:gamer_id", GamerController.deleteGamer)
    // REGISTER GAMER
    app.post("/api/gamers/register", GamerController.register)
    // LOGIN GAMER
    app.post("/api/gamers/login", GamerController.login)
}