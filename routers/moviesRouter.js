const express = require('express');
const router = express.Router();
const moviesBL = require('../models/moviesBL');

router.get('/', async function (req, res) {
    return res.json(await moviesBL.getMovies(req.body))
})

router.post('/', async function (req, res) {
    let resp = await moviesBL.addMovie(req.body);
    return res.json(resp);
})
router.put('/:id', async function (req, res) {
    let resp = await moviesBL.updateMovie(req.params.id, req.body);
    return res.json(resp)
})
router.delete('/:id', async function (req, res){
    let id = req.params.id;
    moviesBL.deleteMovie(id).then(resp=>{return res.json(resp)}).catch(err=>console.log(err))
})

module.exports = router;
