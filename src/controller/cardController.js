const cardModel = require ("../models/cardModel.js")
const customerModel = require ("../models/customerModel.js")

const getCards = async (req, res) => {
    try {
        let fetchCards = await cardModel.find()
        if(fetchCards.length < 1) return res.status(400).json("No cards found")
        return res.status(200).json(fetchCards)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const createCard = async (req, res) => {
    try {
        let data = req.body
        let {cardNumber, cardType, customerName, status, vision, customerID} = data
        
        let checkCNumber = await cardModel.find().sort({_id:-1}).limit(1)
        if(checkCNumber.length === 0){
            cardNumber = "C001"
        }else{
            let test = (checkCNumber[0].cardNumber).split('')
        let splitNumber = test.slice(3).join('')
        
        let num = parseInt(splitNumber)+1
        let card = "C00"+num
        cardNumber = card
        }
        console.log(checkCNumber)
        

        if(!cardType) return res.status(400).json("Please enter card type")
        cardType = cardType.toUpperCase()
        if (!["REGULAR", "SPECIAL"].includes(cardType)) {
            return res.status(400).json("type can be either REGULAR or SPECIAL");
        }

        let customerDetails = await customerModel.findOne({firstName : customerName})
        if (!customerDetails){
                return res.status(400).json( "customer not found")
        }
        let customerId = customerDetails._id
        
        customerID = customerId
        if (status) {
           status = status.toUpperCase()
        if (!["ACTIVE", "INACTIVE"].includes(status)) {
            return res.status(400).json("status can be either ACTIVE or INACTIVE");
        } 
        }

        if(!vision) return res.status(400).json("Please enter card vision")

        let saveCard = await cardModel.create({ cardNumber, cardType, customerName, status, vision, customerID})
        let popID = await cardModel.findById({_id : saveCard._id}).populate("customerID").select("customerID")
        return res.status(201).json(popID)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {getCards, createCard}
