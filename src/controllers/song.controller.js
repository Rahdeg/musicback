const { Songs } = require("../models/song.model");

exports.addSong = async function (req, res) {
  const data = req.body;
  try {
    const song = new Songs(data);
    song.save();
    return res.status(201).json(song);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error });
  }
};

exports.getSongs = async function (req, res) {
  try {
    const option={
      sort:{
        createdAt:1,
      },
    }
    data = await Songs.find(option);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error });
  }
};

exports.getSong = async function (req, res) {
  try {
    const data = await Songs.findById({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    if (error.name == "CastError") {
      return res.status(400).json(error.message);
    }
    return res.status(500).json(error);
  }
};

exports.deleteSongs = async function (req, res) {
  try {
    const song = await Songs.findByIdAndDelete({ _id: req.params.id });
    if (!song) {
      return res
        .status(404)
        .json({ msg: `No song with id ${req.params.id}` });
    } else {
      return res
        .status(200)
        .json({ msg: "song Deleted Successfully", data: null });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateSong= async (req,res)=>{
  const update= req.body;
 Songs.findByIdAndUpdate(req.params.id,update,{new:true}, (err, data)=>{
     if (data) {
         return  res.status(200).send({success:true, songs:data}); 
     }
     if (err) {
         return  res.status(400).send({success:false, msg:'data not found'});
     }
 })

}