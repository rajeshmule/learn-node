var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res)
{
    // console.log(req.session);
    // console.log("req.session.userid",req.session.username);
    // if(req.session && req.session.userid) {
    //     res.render('index', { title: 'Express' });
    // } else {
    //     res.redirect('/users/signin');
    // }
    res.render('index', { title: 'Express' });

});

module.exports = router;
