import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();


const auth = async (req, res, next) => {
    console.log("Auth middleware triggered"); // Debugging line

    try {
        // Retrieve the token from cookies, body, or headers
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            console.log("No token provided"); // Debugging line
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        console.log("Token received:", token); // Debugging line

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully:", decode); // Debugging line

            // Attach the decoded user to the request object
            req.user = decode;
        } catch (err) {
            console.log("Invalid token:", err.message); // Debugging line
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next(); // Passing control to the next middleware
    } catch (error) {
        console.log("Error in auth middleware:", error); // Debugging line
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

export { auth };






// isStudent
// const isStudent=async(req,res,next)=>{
//     try{
//         if(req.user.accountType!=="Student"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is a protected route for students only",
//             })
//         }
//         next();
//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"user role cannot be verifies,please try again",
//         })
//     }
// }
// export {isStudent}




// isAdmin
const isAdmin=async(req,res,next)=>{
    try{
        console.log("req userL:",req.user)
        console.log("req.user.role:", req.user.role);
        if(req.user.role!=="admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin only",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user role cannot be verifies,please try again",
        })
    }
}
export {isAdmin}