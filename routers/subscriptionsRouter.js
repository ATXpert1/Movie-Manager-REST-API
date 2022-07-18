const express = require('express');
const router = express.Router();
const subscriptionBL = require('../models/subscriptionsBL');

router.get('/', async function (req, res) {
    let subscriptions = await subscriptionBL.getSubscriptions();
    return res.json(subscriptions);
})
router.post('/:id', function (req, res) {
    let id = req.params.id;
    let movieInfo = req.body;
    subscriptionBL.addSubscription(id, movieInfo)
        .then(resp => {
            return res.json(resp)
        })
        .catch(err => {
            console.log(err)
            return res.json(err);
        })
})

module.exports = router;
