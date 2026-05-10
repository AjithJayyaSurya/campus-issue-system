import { v2 as cloudinary } from "cloudinary";

export function initializeCloudinary() {
  const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };

  // Validate credentials
  console.log("\n🔧 Cloudinary Configuration:");
  console.log("   Cloud Name:", config.cloud_name ? `✓ ${config.cloud_name}` : "✗ MISSING");
  console.log("   API Key:", config.api_key ? "✓ Set" : "✗ MISSING");
  console.log("   API Secret:", config.api_secret ? "✓ Set" : "✗ MISSING");

  if (!config.api_key || !config.api_secret || !config.cloud_name) {
    console.warn("⚠️ WARNING: Cloudinary credentials incomplete!");
    console.warn("   Make sure .env has all 3 values:");
    console.warn("   - CLOUDINARY_CLOUD_NAME");
    console.warn("   - CLOUDINARY_API_KEY");
    console.warn("   - CLOUDINARY_API_SECRET");
  }

  cloudinary.config(config);
  console.log("✅ Cloudinary initialized\n");
  return cloudinary;
}

export default cloudinary;
