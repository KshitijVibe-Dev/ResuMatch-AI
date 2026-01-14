const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Setup
const API_URL = "http://localhost:5000/api";
const USER_EMAIL = "rahul@example.com";
const USER_PASS = "password123";
// Ye wahi file dhundega jo aapne manually banakar rakhi hai
const RESUME_PATH = path.join(__dirname, "test-resume.pdf"); 

async function testSystem() {
  try {
    console.log("🚀 Testing Start...");

    // 1. Check File
    if (!fs.existsSync(RESUME_PATH)) {
        console.error("❌ Error: 'test-resume.pdf' nahi mili! Please manually paste it inside backend-api folder.");
        return;
    }

    // 2. Login
    console.log("🔑 Logging in...");
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: USER_EMAIL,
      password: USER_PASS
    });
    const token = loginRes.data.token;
    console.log("✅ Login Successful!");

    // 3. Upload
    console.log("📄 Uploading Resume...");
    const form = new FormData();
    form.append('resume', fs.createReadStream(RESUME_PATH));

    const uploadRes = await axios.post(`${API_URL}/resume/upload`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });

    // 4. Result
    console.log("\n🤖 AI Result Agaya:");
    console.log("------------------------------------------------");
    console.log("🎯 Score:", uploadRes.data.data.aiScore);
    console.log("📝 Summary:", uploadRes.data.data.summary);
    console.log("------------------------------------------------");
    console.log(`✅ Credits Left: ${uploadRes.data.creditsLeft}`);

  } catch (error) {
    console.error("❌ Error:", error.response ? error.response.data : error.message);
  }
}

testSystem();