//npm i multer help to store multimedia on the server side
import express from 'express'
const router = express.Router()
import multer from 'multer'



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },

    //there will be problem as 'ERR_INVALID_ARG_TYPE' if you use
    //req.body.name and then use thunder client as thunder client
    //order of transmitting fields and files to server is diffent than 
    // react client side hence req.body will be undefined even if you 
    // create a json req in thunder client
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },


    // //custom code
    // filename: function (req, file, cb) {
    //     cb(null, Date.now() + "--" + file.originalname);
    //   },
});
const upload = multer({ storage: storage, });
//above code is boilerPlate

router.post('/', upload.single("file"), async (req,res)=>{
    try {
        return res.status(200).json("File Uploaded Successfully")
    } catch (error) {
        console.log(error)
        
    }

    //custom code

    // try {
    //     if (req.file === undefined)
    //       return res
    //         .status(400)
    //         .json({ error: false, msg: "You must select a file." });
    //     const url =
    //       req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    //     res
    //       .status(200)
    //       .json({ error: false, msg: "File uploaded successfully!", imgUrl: url });
    //   } catch (error) {
    //     res.status(400).json({ error: true, msg: "Img upload failed" });
    //   }
});

//just for testing
// router.post('/',async (req,res)=>{

//     console.log(req.body);
//     return res.status(200).json(req.body.name);
// })

export default router