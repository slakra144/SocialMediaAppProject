import  express  from  "express";
import { loginUser, registerUser } from "../Controllers/AuthCOntroller.js";
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
// router.get('/', async(req,res)=>{
//     res.send("Auth page")
// })

export default router;