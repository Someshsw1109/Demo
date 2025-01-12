import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
  try {
    console.log("try ke andr aaya he mail sender ke:");
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, 
      port: 587,  
      secure: false,  
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS,  
      },
    });
    console.log("transport bhi cl gya:");
    let info = await transporter.sendMail({
      from: 'SRC Mart',  
      to: email, 
      subject: title,  
      html: body,  
    });

    console.log(info);
    return info;  
  } catch (error) {
    console.error("Error sending mail:", error.message);
    throw new Error("Mail sending failed");
  }
};

export default mailSender;
