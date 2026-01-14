// Ye script fake user banakar server ko bhejegi
async function testRegister() {
  const url = "http://localhost:5000/api/auth/register";
  
  const userData = {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    password: "password123"
  };

  try {
    console.log("⏳ Sending data to server...");
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    
    console.log("\n-----------------------------");
    if (response.ok) {
        console.log("✅ SUCCESS! User Created:");
        console.log(result);
    } else {
        console.log("❌ FAILED:", result);
    }
    console.log("-----------------------------\n");

  } catch (error) {
    console.log("❌ Server Error:", error.message);
  }
}

testRegister();