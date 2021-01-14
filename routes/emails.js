let Email = require('../models/emails').Email;
let uniquid = require('uniquid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, async (req, resp) => {
   resp.send(await Email.find());
});
router.post('/', async(req, resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniquid(),
        name: reqBody.name,
        email: reqBody.email,
        date: new Date(),
        text: reqBody.text
    })
    await newEmail.save();
    resp.send('Accepted!');
});
router.delete('/:id', authMiddleware, async (req, resp) => {
    await Email.deleteOne({id: req.params.id});
    resp.send('Deleted');
});


module.exports = router;