const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const User = require('../../models/User');
//@route GET api/auth
//desc: test route
//@publica
router.get('/', auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

//-------------------------------------------------//

//@route POST api/auth
//@desc: Authenticate user & get token
//@access: public
router.post('/', 
[
check('password', '-password requerido-').exists(),
check('email', '-debe incluir un email válido-').isEmail()
],
async (req, res) => {
    //console.log(req. body)
    const { email, password } = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors :  errors.array()})
    }

   //check user existence
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors : [{msg: 'user not found'}] })  
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){ 
            return res.status(400).json({errors : [{msg: 'las credenciales no son correctas'}] }) 
        }

        //return jsonwebtoken
        
        const payload = {
            user : {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err
                res.json({token})
            })
       
        /* console.log('user created')
        res.json({msg:'datos correctos user creado', datos : req.body.name + req.body.email}) */

    } catch (error) {
        console.error(error.message)
        return res.status(500).send('server error')
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
})


module.exports = router