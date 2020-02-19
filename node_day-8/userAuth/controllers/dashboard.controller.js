

exports.getDashboard = (req, res) =>
{
    console.log("inside get dashboard");
    // basic authorization
    // if (req.session && req.session.userId) {
    //     res.render('dashbord')
    // } else {
    //     res.redirect('/users/signup');
    // }
    res.render('dashboard');
}





