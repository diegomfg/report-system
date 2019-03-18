const server = require("express");
const router = server.Router({mergeparams: true});

router.get("/", (req, res) => {
  
  res.render("index.ejs", {currentUser: req.user});
  
});


router.get("/error", (req, res)=>{
    res.render("404.ejs", {path: req.path, currentUser: req.user});
});
module.exports = router;