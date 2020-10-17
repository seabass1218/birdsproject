exports.get_birds_create = function(req,res) {
    res.render('create', { title: 'Create' });
}

exports.post_birds_create = function(req,res) {
    let enabled = false;
    if (req.body.enabled == 'on') {
        enabled = true;
    }

    //format into JSON in order to save to database
    let newBird = {
        species: req.body.species,
        nickname: req.body.nickName,
        enabled: enabled
    }

    //todo: save these to a database
    console.log(newBird);
    //what next? Get user to a confirmation page
    res.redirect('/birds');

}