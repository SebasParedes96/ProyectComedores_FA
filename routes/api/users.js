const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const  bcrypt = require('bcryptjs')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

//@route POST api/users
//@desc: registration route
//@access: public
//]

router.post('/', 
[
check('name', '-el nombre es requerido-').not().isEmpty(),
check('password', '-el password debe ser de un minimo de 6 caracteres-').isLength({min:6}),
check('email', '-debe incluir un email valido-').isEmail()  
],
async (req, res) => {
    
    console.log(req.body)
    
    const {name, email, password } = req.body

    console.log('incoming data=>', name, email, password)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
            return res.status(400).json({errors :  errors.array()})
    }

   //check user existence
    try {
        let user = await User.findOne({email})
        if (user){ res.status(400).json({errors : [{msg: 'el usuario ya existe'}] })  }
        
        //get user gravatar

        const avatar = gravatar.url(email,{
            s: '200',
            r:'pg',
            d:'mm'
        })

        console.log(avatar)

        //new instance of user mongodb document model
        user = new User({
            name, 
            email,
            avatar,
            password
        })

         //encrypt passw
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()
        
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
        res.status(500).send('server error')
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
})

module.exports = router