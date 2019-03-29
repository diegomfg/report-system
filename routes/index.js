const server = require("express");
const router = server.Router({mergeparams: true});

router.get("/", (req, res) => {
  
  res.send({message: `Route: ${req.path}`});
  
});


router.get("/error", (req, res)=>{
    res.send({path: req.path, currentUser: req.user});
});
module.exports = router;