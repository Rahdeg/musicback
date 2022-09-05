const router = require("express").Router();
const {getArtist,addArtist,deleteArtist,getArtists,updateArtist} = require("../controllers/artist.controller");
const {artistValidation} = require("../validation/validation")

router.post("/save",artistValidation,addArtist);
router.get("/get",getArtists);
router.get("/get/:id",getArtist);
router.delete("/delete/:id",deleteArtist);
router.put("/update/:id",updateArtist);

module.exports = router;