import otpgenerator from "otp-generator"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import mailSender from "../utils/mailSender.js"
import otpTemplate from "../mail/template/emailVerificationTemplate.js"
import User from "../Schema/User.js"
import OTP from "../Schema/OTP.js"


const sendotp = async (req, res) => {
    try {
      const { email } = req.body;
      console.log("try ke andr aaya:");
      const checkUserPresent = await User.findOne({ email });
  
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User already registered",
        });
      }
    
  
      let otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      console.log("OTP generated:", otp);
  
      let result = await OTP.findOne({ otp });
      console.log("Result is Generate OTP Func");
      console.log("OTP", otp);
      console.log("Result", result);
  
      while (result) {
        otp = otpgenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        result = await OTP.findOne({ otp });
      }
      
      const otpPayload = { email, otp };
      const otpBody = await OTP.create(otpPayload);
      
      try {
        const emailResponse = await mailSender(email, "OTP Verification", otpTemplate(otp));
        console.log("OTP email sent successfully", emailResponse.response);
      } catch (error) {

        await OTP.deleteOne({ otp: otpBody.otp });
        console.error("Error sending OTP email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email",
          error: error.message,
        });
      }
  
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
export {sendotp}  




const signup=async(req,res)=>{
    try{
        
        const{
            name,
            email,
            password,
            role,
            phonenumber,
            otp
        }=req.body;
    
        if(!name  || !email || !password  || !otp){
            return res.status(403).json({
                success:false,
                message:'All fields are required',
            })
        }
    
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User is already registered',
            })
        }
    
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
    
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"The otp is not valid",
            })
        }else if(otp!=recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:'OTP is invalid',
            });
        }
    
        const hashedPassword=await bcryptjs.hash(password,10);
    

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role,
            phonenumber
        })

        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"User cannot be registered.Please try again",
        })
    }
}
export {signup};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            });
        }

        if (await bcryptjs.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                role:user.role
            };
        console.log("password match ho gye:")

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 34 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'Logged in successfully',
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login.",
        });
    }
};
export {login}
