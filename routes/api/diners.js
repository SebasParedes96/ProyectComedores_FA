const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const Diner = require('../../models/Diner')
const { cookie } = require('request')


//@route POST api/diners
//desc: create Diner
//@private
router.post('/', [ auth, [
    check('name','name is required').not().isEmpty(),
    check('address','address is required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {

        const newDiner = {
            name: req.body.name,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            user: req.user.id
        }

        const diner = new Diner(newDiner)

        const response = await diner.save()

        res.json(response)

    } catch (err) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }

})

//@route GET api/diners
//desc: get all diners
// Private??
 
router.get('/', auth, async (req, res) => {
    try {
        
        const diners = await Diner.find( {leavingDate: null} ).sort({date: -1})

        res.json(diners)

    } catch (error) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }
})

//@route GET api/diner/:id
//desc: get diner by Id
//@Private
 
router.get('/:id', auth ,async (req, res) => {
    try {
        const diner = await Diner.findById(req.params.id)
        
        if(!diner) return res.status(404).json({msg: 'El comedor no existe'}) 

        res.json(diner)

    } catch (err) {
        
        console.error(err.message)
        
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'El comedor no existe'})
        }

        res.status(500).send('Server Error')
    }
})

//@route DELETE api/diner/:id
//desc: DELETE diner by Id
//@Private
 
router.delete('/:id', auth, async (req, res) => {
    try {

        const diner = await Diner.findByIdAndUpdate(req.params.id,{leavingDate: new Date()})

        res.json({msg: 'el comedor ha sido borrado'})

    } catch (err) {
        
        console.error(err.message)
        
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'El comedor no existe'})
        }

        res.status(500).send('Server Error')
    }
})

//@route PUT api/diner/:id
//desc: update a diner by Id
//@Private

router.put('/:id', [ auth, [
    check('name','name is required').not().isEmpty(),
    check('address','address is required').not().isEmpty()
]], async (req, res) => {
    const { name, address, latitude, longitude } = req.body
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {

        await Diner.findByIdAndUpdate(req.params.id,{ name, address, latitude, longitude})


        return res.json({msg: 'la informacion del comedor fue modificada.'})

    } catch (err) {

        console.error(err.message)
        
        return res.status(500).send('Server Error')
    }

})


module.exports = router