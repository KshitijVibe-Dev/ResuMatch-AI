require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function checkModels() {
  try {
    console.log("⏳ Fetching Groq Models...");
    const list = await groq.models.list();
    
    console.log("\n👇 Available Models:");
    list.data.forEach((model) => {
      // Humein sirf Llama wale models dekhne hain
      if (model.id.includes("llama")) {
        console.log(`✅ ${model.id}`);
      }
    });
    console.log("\n-------------------");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

checkModels();