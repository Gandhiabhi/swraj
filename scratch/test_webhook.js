const fetch = require('node-fetch'); // wait, let's check if node-fetch is available, or use native fetch if node 18+

async function runTest() {
  const url = "https://script.google.com/macros/s/AKfycbwjBtdJSy-B-gjRDVtAXWXyGwtLdWLx36CWboFBAZRjMabJ6CS38sveUv3oSOpI_fQR/exec";
  const payload = {
    name: "Subagent Test",
    mobile: "9999999999",
    city: "Test City",
    product: "Cabinet & Drawer Handles",
    timestamp: new Date().toISOString()
  };

  console.log("Sending POST to:", url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(payload)
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response text:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}

runTest();
