const project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Upload file to Cloudinary
const uploadToCloudinary = (
  fileBuffer,
  folder,
  resourceType = "auto",
  retries = 2
) => {
  return new Promise((resolve, reject) => {
    const upload = (attempt) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            if (attempt <= retries) {
              console.log(`Retrying upload... ${attempt}`);

              setTimeout(() => {
                upload(attempt + 1);
              }, 1000);

              return;
            }

            reject(error);
            return;
          }

          resolve(result);
        }
      );

      streamifier
        .createReadStream(fileBuffer)
        .pipe(stream);
    };

    upload(1);
  });
};

// Create Project=====================================
const createProject = async (req, res) => {
  try {
    console.log("body", req.body);
    console.log("files", req.files);

    // =========================================
    // 1. Upload Cover Images
    // =========================================

    const coverImages = [];

    if (req.files.coverImages) {
      for (const file of req.files.coverImages) {
        const coverResult = await uploadToCloudinary(
          file.buffer,
          "video-editor/projects/covers",
          "image"
        );

        coverImages.push({
          url: coverResult.secure_url,
          publicId: coverResult.public_id,
        });
      }
    }

    // =========================================
    // 2. Upload Videos + Matching Posters
    // =========================================

    const videos = [];

    if (req.files.video && req.files.poster) {
      const videoFiles = req.files.video;
      const posterFiles = req.files.poster;

      // Every video must have one poster
      if (videoFiles.length !== posterFiles.length) {
        return res.status(400).json({
          message: "Every video must have a matching poster",
        });
      }

      // Upload each video and poster
      for (let i = 0; i < videoFiles.length; i++) {
        // Upload video
        const videoResult = await uploadToCloudinary(
          videoFiles[i].buffer,
          "other-edits/projects/videos",
          "video"
        );

        // Upload poster
        const posterResult = await uploadToCloudinary(
          posterFiles[i].buffer,
          "other-edits/projects/posters",
          "image"
        );

        videos.push({
          url: videoResult.secure_url,
          publicId: videoResult.public_id,

          posterUrl: posterResult.secure_url,
          posterPublicId: posterResult.public_id,
        });
      }
    }

    // =========================================
    // 3. Save Project in MongoDB
    // =========================================

    const newProject = await project.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      status: req.body.status,

      coverImages: coverImages,
      videos: videos,
    });

    // =========================================
    // 4. Send Response
    // =========================================

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};



// Get All Projects====================
const getProjects = async (req, res) => {
  try {
    const projects = await project.find().sort({ createdAt: -1 });

    res.status(200).json({
      projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};


// delete project funcion ==================================

const deleteProject = async (req, res) => {
  try {
    console.log("DELETE ID:", req.params.id);

    const deletedProject = await project.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};
// update project function ===============

const updateproject= async(req,res)=>{
  try{
    const updateproject= await project.findByIdAndUpdate(
      req.params.id,{
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        status:req.body.status,
      },
      {
        new:true,
        runValidators:true,
      }
    );

    if(!updateproject){
     return  res.status(404).json({
      message:"project not found"
     });
    }

    res.status(200).json({
      message:"Project update successfully",
      project:updateproject,
    });
  }catch(error){
    console.error("UPDATE PROJECT ERROR:", error)
    res.status(500).json({
      message:"Server error",
      error:error.message
    });
  }
}

module.exports = {
  createProject,getProjects,deleteProject,updateproject
};