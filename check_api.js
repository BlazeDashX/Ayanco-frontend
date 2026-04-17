/**
 * Script to check local API output.
 * Run with: node check_api.js
 */
async function check() {
  try {
    const res = await fetch("http://localhost:3000/api/public/home/stats");
    const status = res.status;
    const body = await res.text();
    console.log(`Status: ${status}`);
    console.log(`Body: ${body}`);
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}
check();
