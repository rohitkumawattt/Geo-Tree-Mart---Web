const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\1d92b024-708a-4b2e-8e25-a92a67e91d66\\banner_plant_illustration_1782457020152.png";
const dest = path.join(__dirname, "src", "assets", "banner_plant_illustration.png");

fs.copyFile(src, dest, (err) => {
  if (err) {
    console.error("Error copying file:", err);
  } else {
    console.log("File copied successfully to:", dest);
  }
});
