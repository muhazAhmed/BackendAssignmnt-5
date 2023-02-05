const customerModel = require ("../models/customerModel.js")

const createCustomer = async (req, res) => {
    try {
        let data = req.body
        let {firstName, lastName, mobileNumber, DOB, emailID, address, customerID, status} = data
        if(!firstName)  return res.status(400).json("please enter first name")
        if(!lastName)   return res.status(400).json("please enter last name")
        if(!mobileNumber)   return res.status(400).json("please enter mobile number")
        if (!(/^[0-9]{10}$/).test(mobileNumber))   return res.status(400).json( "mobile number is invalid")
        let checkMobile = await customerModel.findOne({ mobileNumber })
        if(checkMobile) return res.status(400).json("This mobile number is already registered")
        
        if(!DOB)    return res.status(400).json("please enter date of birth")
        if (!(/\d{1,2}(\/|-)\d{1,2}(\/|-)\d{2,4}/.test(DOB)))   return res.status(400).json("DOB is invalid format")

        if(!emailID)    return res.status(400).json("please enter email address")
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailID))  return res.status(400).json( "emailId is invalid")

        let checkEmail = await customerModel.findOne({ emailID })
        if(checkEmail) return res.status(400).json("This emailId is already taken")

        if(!address)    return res.status(400).json("please enter address")
        const { v4: uuidv4 } = require('uuid');
        req.body.customerID = uuidv4()

        if(!status) return res.status(400).json("please enter status")
        status = status.toUpperCase()
        console.log(status)
        if (!["ACTIVE", "INACTIVE"].includes(status)) {
            return res.status(400).json("status can be either ACTIVE or INACTIVE");
        }

        let saveData = await customerModel.create(data)
        return res.status(201).json(saveData)
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const getCustomer = async (req, res) => {
    try {
        let fetchData = await customerModel.find({status : "ACTIVE"})
        if(!fetchData){ return res.status(400).json("No active customers found") }
        return res.status(200).json(fetchData)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const updateCustomer = async (req, res) => {
    try {
        let data = req.body
        let id = req.params.id

        let {firstName, lastName, mobileNumber, DOB, emailID, address, customerID, status} = data

        if(mobileNumber){
            if (!(/^[0-9]{10}$/).test(mobileNumber))   return res.status(400).json( "mobile number is invalid")
            let checkMobile = await customerModel.findOne({ mobileNumber })
            if(checkMobile) return res.status(400).json("This mobile number is already registered")
        }
        
        if(DOB){
            if (!(/\d{1,2}(\/|-)\d{1,2}(\/|-)\d{2,4}/.test(DOB)))   return res.status(400).json("DOB is invalid format")
        }

        if(emailID){
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailID))  return res.status(400).json( "emailId is invalid")
            let checkEmail = await customerModel.findOne({ emailID })
            if(checkEmail) return res.status(400).json("This emailId is already taken")
        }

        if(status){
            status = status.toUpperCase()
            // console.log(status)
            if (!["ACTIVE", "INACTIVE"].includes(status)) {
                return res.status(400).json("status can be either ACTIVE or INACTIVE");
            }
        }

        let saveData = await customerModel.findByIdAndUpdate({ _id: id },{ $set: data },{ new: true })
        if (!saveData){ return res.status(400).json("No customer found") }
        return res.status(200).json(saveData)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const deleteCustomer = async (req, res) => {
    try {
        let id = req.params.id
        let deleteData = await customerModel.findByIdAndRemove({_id : id})
        if (!deleteData) { return res.status(404).json("no customer found with given ID") }
        return res.status(200).json("customer data deleted")
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {createCustomer, getCustomer, updateCustomer, deleteCustomer}