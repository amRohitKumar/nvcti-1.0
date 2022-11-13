const express = require("express");
const puppeteer = require("puppeteer");
const { isLoggedIn, isAdmin } = require("../middleware");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");

const printPDF = async (url, tokenObj) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }); // launching headless browser
    const page = await browser.newPage();

    // go to page
    console.log(tokenObj, url);
    await page.evaluateOnNewDocument((tokenObj) => {
      localStorage.clear();
      localStorage.setItem("user", tokenObj);
    }, tokenObj);
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.addStyleTag({
      content:
        "#print-button {display: none} body{padding: 2em; transform: scale(0.9)}",
    });
    const pdf = await page.pdf({ printBackground: true, format: "A4" });
    await browser.close();
    return pdf;
  } catch (err) {
    console.log("error in printPDF server = ", err);
  }
};

router.route("/printapplication").post(
  //   isLoggedIn,
  //   isAdmin,
  catchAsync(async (req, res) => {
    // console.log("bb = ", req);
    const { tokenObj, baseUrl } = req.body;
    const url = "http://localhost:3000" + baseUrl;
    const resp = await printPDF(url, tokenObj);
    res.set({
      "Content-Type": "application/pdf",
    });
    res.status(201).send(Buffer.from(resp, "binary"));
    // res.send( );
  })
);

module.exports = router;
