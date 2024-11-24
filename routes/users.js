var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const timestamp = await demo();
  res.send("respond with a resource: " + timestamp);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo() {
  for (let i = 0; i < 3; i++) {
    console.log(`Starting for ${i * 1000} milisecond, i = ${i}`);
    sleep(i * 1000).then(() => {
      console.log(`Finished for ${i * 1000} milisecond, i = ${i}`);
    });
    await sleep(i * 1000);
    console.log(`Waiting for ${i * 1000} milisecond, i = ${i}`);
  }
  return new Date().toLocaleString();
}

module.exports = router;
