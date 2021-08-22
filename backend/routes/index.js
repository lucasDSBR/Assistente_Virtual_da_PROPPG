var router = require('express').Router();

router.get("/", function(req, res){
    res.send("backend....");
});


module.exports = router;