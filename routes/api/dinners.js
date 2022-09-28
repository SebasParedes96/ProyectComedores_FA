const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const User = require('../../models/User')
const Diner = require('../../models/Post')
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
        return res.status(400).json({errors: errors.array})
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

        await diner.save()

        res.json(diner)

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

//@route DELETE api/posts/:id
//desc: DELETE post by Id
//@Private
 
router.delete('/:id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id)

        
        if(!post){
            return res.status(404).json({msg: 'El post no existe'})
        }
        
        //check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Usuario no autorizado'})
        }  

        await post.remove()

        res.json({msg: 'el post ha sido borrado'})

    } catch (err) {
        
        console.error(err.message)
        
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'La publicacion no existe'})
        }

        res.status(500).send('Server Error')
    }
})

//@route PUT api/posts/like/:id
//desc: LIKE A post by Id
//@Private

router.put('/like/:id', auth, async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id)
        
        //check if the post has already been liked

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg : 'el post ya ha sido likeado previamente'})
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        return res.json(post.likes)

    } catch (err) {

        console.error(err.message)
        
        return res.status(500).send('Server Error')
    }

})

//@route PUT api/posts/unlike/:id
//desc: UNLIKE A post by Id
//@Private

router.put('/unlike/:id', auth, async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id)
        
        //check if the post has already been liked

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg : 'el post NO ha sido likeado previamente'})
        }

        //get the remove index
        //const removoIndex = post.likes.map(like = like.user.toString()).indexOf(req.user.id)
        const removeIndex = post.likes.map(like => like.user.toString() === req.user.id).indexOf() 

        post.likes.splice(removeIndex, 1)

        await post.save()

        return res.json(post.likes)

    } catch (err) {

        console.error(err.message)
        
        return res.status(500).send('Server Error')
    }

})

//@route PUT api/posts/comment/:id
//desc: comment on posts
//@private
router.post('/comment/:id', [ auth, [
    check('text','text is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }

    try {
        // obtain the user but exclude the password
        const user = await User.findById(req.user.id).select('-password')
        // obtain the post
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment) 

        await post.save()

        res.json(post.comments)

    } catch (err) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }

})


//@route DELETE api/posts/comment/:id/:comment_id
//desc: delete a comment on posts
//@private
router.delete('/comment/:id/:comment_id', auth ,async (req, res) => {
    
    try {

        //console.log('user-id:=>',req.user.id)
        
        const post = await Post.findById(req.params.id)
        
        if(!post) return res.status(404).json({msg:'post not found'})

        //console.log('si hay post ?=>',post)
        
        //pull out commen
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id)

        if(!comment) return res.status(404).json({msg: 'el comentario no existe'})

        //check users: only post owner & comment owner can delete comments.
        if(comment.user.toString() !== req.user.id && 
            post.user.toString() !== req.user.id) { 
            return res.status(401).json({msg: 'no tiene autorización'})
        } 

        // const removeIndex = post.likes.map(like => like.user.toString() === req.user.id).indexOf() 
        //get remove index
        const removeIndex = post.comments
            .map(comment => comment.user.toString() === req.user.id)
            .indexOf()    

        post.comments.splice(removeIndex, 1)

        await post.save()

        return res.json(post.comments)

    } catch (err) {

        console.error(err.message)
        
        return res.status(500).send('Server Error')
    }

})


module.exports = router