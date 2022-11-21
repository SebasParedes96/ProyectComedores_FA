const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const List = require('../../models/List')


//@route POST api/lists
//desc: create list
//@private
router.post('/', [ auth, [
    check('nameDiner','Diner is required').not().isEmpty(),
    check('user','login is required').not().isEmpty(),
    check('weekNumber','Number of week is required').not().isEmpty(),
    check('week','Lists is required').isArray({ min: 1 })
    // agregar validacion para dias y productos con .* de express-validator
]], async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    

    try {
        const newList = req.body

        const list = new List(newList)

        await list.save()

        res.json(list)

    } catch (err) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }

})

//@route GET api/lists
//desc: get all lists
//Private

router.get('/', auth ,async (req, res) => {
    try {
        
        const lists = await List.find( {leavingDate: null} ).sort({date: -1})

        res.json(lists)

    } catch (error) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }
})

//@route GET api/lists/:id
//desc: get post by Id
//@Private
 
router.get('/:id', auth ,async (req, res) => {
    try {
        
        const list = await List.findById(req.params.id)
        
        if(!list) return res.status(404).json({msg: 'La lista no existe'}) 

        res.json(list)

    } catch (err) {
        
        console.error(err.message)
        
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'La publicacion no existe'})
        }

        res.status(500).send('Server Error')
    }
})

//@route DELETE api/lists/:id
//desc: DELETE lists by Id
//@Private
 
router.delete('/:id', auth, async (req, res) => {
    try {
        
/*         check user (mas adelante necesario para cuando haya mas administradores de diferentes comedores)
        if(diner.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Usuario no autorizado'})
        }  */ 

        const list = await List.findByIdAndUpdate(req.params.id,{leavingDate: new Date()})

        res.json({msg: 'La lista ha sido eliminada'})

    } catch (err) {
        
        console.error(err.message)
        
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'La lista no existe'})
        }

        res.status(500).send('Server Error')
    }
})

//@route PUT api/lists/:id
//desc: update a list by Id
//@Private

router.put('/:id', [ auth, [
    check('nameDiner','Diner is required').not().isEmpty(),
    check('user','login is required').not().isEmpty(),
    check('weekNumber','Number of week is required').not().isEmpty(),
    check('week','Lists is required').isArray({ min: 1 })
]], async (req, res) => {
    const { nameDiner, weekNumber, user, week } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        await List.findByIdAndUpdate(req.params.id, { nameDiner, weekNumber, user, week } )


        return res.json({msg: 'la informacion de la lista fue modificada.'})

    } catch (err) {

        console.error(err.message)
        
        return res.status(500).send('Server Error')
    }

})

module.exports = router