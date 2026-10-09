// Contact model import
const Contact = require("../models/Contact");

const {sendLeadNotification }=require("../config/emailService")

// Create new contact / lead
const createContact = async (req, res) => {
  try {
    // Frontend ton data receive
    const {
      name,
      phone,
      subject,
      message,
    } = req.body;


    // Required fields check
    if (
      !name?.trim() ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }


    // Basic phone validation
    if (!/^[+()\d\s-]{7,20}$/.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }


    // MongoDB vich contact save
    const contact = await Contact.create({
      name: name.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // email notiofication
    await sendLeadNotification(contact);

    // Success response
    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      id: contact._id,
    });

  } catch (error) {

    console.error(
      "Contact form error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to send your message.",
    });
  }
};

const getContacts=async(req,res)=>{
    try{
        const contact=await Contact.find()
        .sort({createdAt:-1});
        return res.status(200).json({
            success:true,
            contact,
        });
    }catch(error){
        console.error("Get contacts error:",error);

        return res.status(500).json({
            success:false,
            message:"Unable to fetch contacts"
        });
    }
};


// Export controller
module.exports = {
  createContact,getContacts
};