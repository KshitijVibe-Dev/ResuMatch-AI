async function testLogin() {
  const url = "http://localhost:5000/api/auth/login";
  
  const loginData = {
    email: "rahul@example.com",
    password: "password123"
  };

  try {
    console.log("⏳ Logging in...");
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();
    
    console.log("\n-----------------------------");
    if (response.ok) {
        console.log("✅ LOGIN SUCCESSFUL! Here is your Token:");
        console.log("🎫 Token:", result.token); // Ye token frontend par save hoga
    } else {
        console.log("❌ LOGIN FAILED:", result);
    }
    console.log("-----------------------------\n");

  } catch (error) {
    console.log("❌ Server Error:", error.message);
  }
}

testLogin();