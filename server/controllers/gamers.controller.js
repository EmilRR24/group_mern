const Gamer = require("../models/gamer.model")

// TEST
module.exports.test = (req,res) => {
    res.json("HELLO WORLD")
}
// CREATE
module.exports.create =  (req,res) => {
    Gamer.create(req.body)
        .then(newGamer => res.json(newGamer)) // SUCCESSFUL CREATION 
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        }) // UNSUCCESSFUL CREATION
}
// READ
module.exports.allGamers = (req,res) => {
    Gamer.find()
        .then(allGamers => res.json(allGamers))
        .catch(err => res.json(err))
}
// READ ONE
module.exports.oneGamer = (req,res) => {
    Gamer.findOne({_id: req.params.gamer_id})
        .then(oneGamer => res.json(oneGamer))
        .catch(err => res.json(err))
}
// UPDATE
module.exports.updateGamer = (req, res) => {
    // FIND ONE AND UPDATE TAKES THREE ARGUMENTS, QUERY, PAYLOAD, BOOLEAN
    Gamer.findOneAndUpdate({_id: req.params.gamer_id}, req.body, {new:true, runValidators: true}) // RUN VALIDATOR MUST BE INCLUDED FOR UPDATE
        .then(updatedGamer => res.json(updatedGamer)) // SUCCESSFUL CREATION
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        }) // UNSUCCESSFUL CREATION
}
// DELETE
module.exports.deleteGamer = (req, res) => {
    Gamer.deleteOne({ _id: req.params.gamer_id })
        .then(result => res.json({ result }))
        .catch(err => res.json(err));
};