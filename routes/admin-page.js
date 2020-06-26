var express = require('express');
var router = express.Router();

/**
 * Admin Page
 * 
 * Page for Admin after they have logged in
 * 
 * Verify that the person has a sesssion, otherwise they
 * need to be redirected back to the login page
 */
router.get('/', function(req, res, next) {
    // if the user session does not exist, redirect back to the login page
    if (!req.session.userid) {
        res.redirect('admin-login');
    }

    // otherwise, render the admin page as usual
    
    // TODO
    /*
     * stuff needed: table data -> get from backend.
     */
    
    // for now, we will render the basic page
    res.render('adminpage');
});

module.exports = router;