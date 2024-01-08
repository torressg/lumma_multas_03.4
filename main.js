const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
require('dotenv').config({ path: './constants/.env' });

async function RunAtomation() {
    const siteUrl = process.env.URL
    const browser = await puppeteer.launch({
        headless: false,
        protocolTimeout: 90000
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(siteUrl, {waitUntil: 'networkidle2'});
}

RunAtomation()