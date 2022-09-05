const router = require("express").Router();
const {login,getUser,getUsers,deleteUser,updateRole} = require("../controllers/user.controller")

router.get("/login",login);
router.get("/get",getUsers);
router.get("/get/:id",getUser);
router.delete("/delete/:id",deleteUser);
router.put("/updateRole/:id",updateRole);

module.exports = router;