const express = require('express');
const router = express.Router();
const membersBL = require('../models/membersBL');

router.get('/', async function(req, res){
    let resp = await membersBL.getMembers();
    return res.json(resp);
})

router.post('/', async function(req,res){
    let resp = await membersBL.addMember(req.body);
    return res.json(resp);
})

router.put('/:id', async function(req, res){
    let resp = await membersBL.updateMember(req.params.id, req.body)
    return res.json(resp);
})
router.delete('/:id', async function(req, res){
    let resp = await membersBL.deleteMember(req.params.id)
    return res.json(resp);
})
module.exports = router;
