const express = require('express')
const route = express.Router()
const customerController = require ("./controller/customerController")
const cardController = require ("./controller/cardController")


route.get("/", (req,res) => {
    return res.json("Api is Working !")
})

//===========  Customer Route =================
route.post("/customer", customerController.createCustomer)
route.get("/customer/data", customerController.getCustomer)
route.put("/customer/update/:id", customerController.updateCustomer)
route.delete("/customer/:id", customerController.deleteCustomer)

//===========  Card Route =================
route.get("/customer/cards", cardController.getCards)
route.post("/customer/cards/new", cardController.createCard)

module.exports = route