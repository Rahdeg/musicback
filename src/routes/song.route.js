const router = require("express").Router();
const {getSong,getSongs,addSong,deleteSongs,updateSong} = require("../controllers/song.controller");
const {songValidation} = require("../validation/validation")

router.post("/save",songValidation,addSong);
router.get("/get",getSongs);
router.get("/get/:id",getSong);
router.delete("/delete/:id",deleteSongs);
router.put("/update/:id",updateSong);

module.exports = router;