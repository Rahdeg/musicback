const { Artist } = require("../models/artist.model");

exports.addArtist = async function (req, res) {
  const data = req.body;
  try {
    const artist = new Artist(data);
    artist.save();
    return res.status(201).json(artist);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error });
  }
};

exports.getArtists = async function (req, res) {
  try {
    const option={
      sort:{
        createdAt:1,
      },
    }
    data = await Artist.find(option);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error });
  }
};

exports.getArtist = async function (req, res) {
  try {
    const data = await Artist.findById({ _id: req.params.id });
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

exports.deleteArtist = async function (req, res) {
  try {
    const artist = await Artist.findByIdAndDelete({ _id: req.params.id });
    if (!artist) {
      return res
        .status(404)
        .json({ msg: `No artist with id ${req.params.id}` });
    } else {
      return res
        .status(200)
        .json({ msg: "artist Deleted Successfully", data: null });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateArtist= async (req,res)=>{
  const update= req.body;
 Artist.findByIdAndUpdate(req.params.id,update,{new:true}, (err, data)=>{
     if (data) {
         return  res.status(200).send({success:true, album:data}); 
     }
     if (err) {
         return  res.status(400).send({success:false, msg:'data not found'});
     }
 })

}
