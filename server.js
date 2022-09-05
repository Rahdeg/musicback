const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./src/config/database");
const userRoute=require("./src/routes/user.route");
const albumRoutes=require("./src/routes/album.route");
const artistRoutes=require("./src/routes/artist.route");
const songRoutes=require("./src/routes/song.route");


const app = express();
connectDatabase(app);
app.use(cors({origin:true}));
app.use(express.json());

app.use('/api/users',userRoute)
app.use('/api/album',albumRoutes)
app.use('/api/artist',artistRoutes)
app.use('/api/song',songRoutes)


app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to the api for the music app" });
});

app.all("*", (req, res) => {
  res.send({
    status: false,
    messsage: "Oops! you've hit an invalid route.",
  });
});