import {
  Clapperboard,
  Palette,
  MonitorPlay,
  MessageCircle,
  Scissors,
  Eye,
  Send,
  FileText,
} from "lucide-react";

// Images from src/assets/Images/
import servicesHero from "../../assets/Images/services-hero.jpg";
import videoEditing from "../../assets/Images/video-editing..jpg";
import reelsEditing from "../../assets/Images/reels-editing.jpg";
import colorGrading from "../../assets/Images/color-grading.jpg";
import motionGraphics from "../../assets/Images/framing.jpg";
import youtubeEditing from "../../assets/Images/studio.jpg";
import promoVideo from "../../assets/Images/commercial.jpg";// Hero section

export const servicesHeroData = {
  eyebrow: "WHAT WE DO",
  title: "Creative Video Editing",
  highlight: "Services",
  description:
    "From raw footage to polished stories, we turn your vision into engaging visual experiences.",
  primaryButton: "Explore Services",
  secondaryButton: "View Our Work",
  image: servicesHero,
};

// Services cards
export const services = [
  {
    number: "01",
    title: "Professional Video Editing",
    description:
      "Transform raw footage into polished videos with smooth cuts, transitions and sound design.",
    image: videoEditing,
  },
  {
    number: "02",
    title: "Reels & Shorts Editing",
    description:
      "Create engaging vertical videos for Instagram Reels and YouTube Shorts.",
    image: reelsEditing,
  },
  {
    number: "03",
    title: "Color Grading",
    description:
      "Enhance colors, contrast and lighting for a cinematic visual experience.",
    image: colorGrading,
  },
  {
    number: "04",
    title: "Motion Graphics",
    description:
      "Bring your ideas to life with animated titles, text and visual effects.",
    image: motionGraphics,
  },
  {
    number: "05",
    title: "YouTube Video Editing",
    description:
      "Create engaging vlogs, long-form videos and talking-head content.",
    image: youtubeEditing,
  },
  {
    number: "06",
    title: "Promotional Videos",
    description:
      "Showcase products, brands and businesses with creative video content.",
    image: promoVideo,
  },
];

// Why choose us
export const features = [
  {
    icon: Clapperboard,
    title: "Creative Storytelling",
    description: "Turn your ideas into clear and engaging stories.",
  },
  {
    icon: Palette,
    title: "Custom Style",
    description: "Give every project its own unique visual identity.",
  },
  {
    icon: MonitorPlay,
    title: "Platform Ready",
    description: "Prepare videos for YouTube and social platforms.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description: "Stay informed throughout the editing process.",
  },
];

// Our workflow
export const workflow = [
  {
    icon: FileText,
    number: "01",
    title: "Understand",
    text: "We discuss your requirements, footage and vision.",
  },
  {
    icon: Scissors,
    number: "02",
    title: "Edit",
    text: "We work on cuts, audio, colors and effects.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Review",
    text: "Review the draft and request agreed revisions.",
  },
  {
    icon: Send,
    number: "04",
    title: "Deliver",
    text: "Receive your final video in the required format.",
  },
];

// Page text
export const servicesPageContent = {
  servicesHeading: "What We Can Do",
  servicesHighlight: "For You",
  servicesDescription:
    "Professional video editing solutions tailored to your needs, from social media content to full-scale productions.",

  whyHeading: "Your Vision + Our Skills",
  whyHighlight: "Amazing Videos",
  whyDescription:
    "We don't just edit videos. We help turn your ideas into visual stories that connect with your audience.",

  workflowHeading: "Simple Steps,",
  workflowHighlight: "Powerful Results",
  workflowDescription:
    "A clear process to bring your video vision to life.",

  ctaEyebrow: "LET'S CREATE",
  ctaHeading: "Have a",
  ctaHighlight: "Video Project",
  ctaEnding: "in Mind?",
  ctaDescription:
    "Let's turn your idea into something worth watching.",
  ctaButton: "Get in Touch",

  brandName: "EditVerse",
};