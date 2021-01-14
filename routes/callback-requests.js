let callbackRequest = require('../models/callback-requests').callbackRequest;
let uniquid = require('uniquid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');





router.get('/', authMiddleware, async (req, resp) => {
   resp.send(await callbackRequest.find());
});


router.post('/', async(req, resp) => {
    let reqBody = req.body;
    let newRequest = new callbackRequest({
        id: uniquid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    resp.send('Accepted!');
});
router.delete('/:id', authMiddleware, async (req, resp) => {
    await callbackRequest.deleteOne({id: req.params.id});
    resp.send('Deleted');
});


module.exports = router;