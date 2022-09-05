const router = require("express").Router();
const {getAlbum,addAlbum,getAlbums,deleteAlbum,updateAlbum} = require("../controllers/album.controller");
const {albumValidation} = require("../validation/validation")

router.post("/save",albumValidation,addAlbum);
router.get("/get",getAlbums);
router.get("/get/:id",getAlbum);
router.delete("/delete/:id",deleteAlbum);
router.put("/update/:id",updateAlbum);

module.exports = router;