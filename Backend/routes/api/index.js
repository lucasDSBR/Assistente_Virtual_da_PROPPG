var router = require('express').Router();
var runIntent = require("./dialogflow").runIntent;



router.get("/", function(req, res){
    res.send("backend...");
});

// /api/requestText POST 
router.post("/requestText", function(req, res){
    (async() => {
        console.log(req.body);
        var result = await runIntent("[nome do projeto aqui]", req.body.requestText);
        return res.send(
            {
                "responseMessage": result.Response,
                "originalQuery": result.Query, 
                "intent": result.intent
            }
        )
    })();
})

module.exports = router;