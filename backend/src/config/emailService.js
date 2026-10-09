const nodemailer= require("nodemailer");

const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_APP_PASSWORD,
    },
});

const sendLeadNotification= async(lead)=>{
    await transporter.sendMail({
        from:`"Video Editing Website "<${process.env.GMAIL_USER}>`,
        to:process.env.GMAIL_USER,

        subject:`New Lead: ${lead.name}`,
        html: `
      <h2>New Contact Form Lead</h2>

      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Subject:</strong> ${lead.subject}</p>
      <p><strong>Message:</strong> ${lead.message}</p>

      <hr />

      <p>This lead was submitted from your website.</p>
    `,
    });
};

const sendPasswordResetOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"Video Editing Website" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Admin Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password Reset Request</h2>

        <p>Your password reset OTP is:</p>

        <h1 style="letter-spacing: 6px;">${otp}</h1>

        <p>This OTP will expire in 10 minutes.</p>

        <p>If you did not request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  });
};

module.exports={
    sendLeadNotification,sendPasswordResetOTP
};