const GamerController = require("../controllers/gamers.controller")


module.exports = app => {
    // TEST SCREEN
    app.get("/api/gamers/test", GamerController.test);
    // CREATE GAMER
    app.post("/api/gamers/new", GamerController.create);
    // GET ALL GAMER
    app.get("/api/gamers", GamerController.allGamers);
    // GET ONE GAMER
    app.get("/api/gamers/:gamer_id", GamerController.oneGamer);
    // EDIT GAMER
    app.put("/api/gamers/:gamer_id", GamerController.updateGamer);
    // DELETE GAMER
    app.delete("/api/gamers/:gamer_id", GamerController.deleteGamer)
    // REGISTER GAMER
    app.post("/api/gamers/register", GamerController.register)
}