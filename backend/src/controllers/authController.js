const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const Admin=require("../models/Admin");
const crypto = require("crypto");
const { sendPasswordResetOTP } = require("../config/emailService");
// Admin login 

const loginAdmin= async(req,res)=>{
    try{
        const{email,password}=req.body;
        // check files 
        if(!email ||!password){
            return res.status(400).json({
                success:false,
                message:"Email and Password are required"
            });
        }
        // find admin 
         const admin=await Admin.findOne({
            email:email.toLowerCase().trim(),
         });
         if(!admin){
            return res.status(401).json({
                success:false,
                message:"INvalid email or password"
            });
         }

        //  check password 

        const isPasswordCorrect= await bcrypt.compare(
            password,
            admin.password
        );

        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password",
            });
        }

        // create jwt token 

        const token= jwt.sign(
            {
                id:admin._id,
                username:admin.username,
                email:admin.email,
            },
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        // send response 
        res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            admin:{
                id:admin._id,
                username:admin.username,
                email:admin.email,
            },
        });
    }catch(error){
        console.error("Login error: ",error.message);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};

// update admin Profile 
const updateAdmin= async(req,res)=>{
    try{
        const adminId= req.admin.id;

        const {
            username,
            email,
            currentPassword,
            newPassword,
        }= req.body;

        // current admin find 

        const admin= await Admin.findById(adminId);
        if(!admin){
            return res.status(404).json({
                success:false,
                message:"Admin not found",
            });
        }

        // current password verify 

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            admin.password 
        );

        if(!isPasswordCorrect){

            return res.status(401).json({
                success:false,
                message:"Current password is incorrect",
            });
        }

        // username update 

        if(username?.trim()){
            admin.username= username.trim();
        }

        // email update 
        if(email?.trim()){
            admin.email= email.toLowerCase().trim();
        }

        // password update 

        if(newPassword?.trim()){
            admin.password= await bcrypt.hash(newPassword.trim(),10);
        }

        await admin.save();
        
        return res.status(200).json({
            success:true,
            message:"Admin details update successfully",
            admin:{
                id:admin._id,
                username:admin.username,
                email:admin.email,
            }
        });

    }catch(error){
        console.error("Update admin error", error.message);

        return res.status(500).json({
            success:false,
            message:"Unable to update admin details"
        })
    }
}

// password forget 

const forgotPassword = async (req,res)=>{
    try{
        const {email}=req.body;

        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email is required"
            });
        }

        const admin= await Admin.findOne({
            email:email.toLowerCase().trim(),
        });

        if(!admin){
            return res.status(404).json({
                success:false,
                message:"Admin with this email does not exist"
            });
        }

        // 6 digit otp 

        const otp= crypto.randomInt(100000, 1000000).toString();

        // otp 10 minuts valid 
        const expiry = new Date(Date.now()+10*60*1000);

        admin.resetOTP= otp;
        admin.resetOTPExpiry= expiry;

        await admin.save();

        // email otp 
        await sendPasswordResetOTP(admin.email,otp);

        return res.status(200).json({
            success:true,
            message: "OTP sent to your email",
        })
    }catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send OTP",
    });
  }
}

// verifyResetOTP 

const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!admin.resetOTP || !admin.resetOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP",
      });
    }

    if (new Date() > admin.resetOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP",
      });
    }

    if (admin.resetOTP !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP",
    });
  }
};

// =========================
// Reset Password
// =========================
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // OTP exists?
    if (!admin.resetOTP || !admin.resetOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP",
      });
    }

    // OTP expired?
    if (new Date() > admin.resetOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP",
      });
    }

    // OTP correct?
    if (admin.resetOTP !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    // OTP nu one-time use bana do
    admin.resetOTP = null;
    admin.resetOTPExpiry = null;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};
module.exports={
    loginAdmin,updateAdmin,forgotPassword,verifyResetOTP,resetPassword
};