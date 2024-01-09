const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
require('dotenv').config({ path: './constants/.env' });

const Delay = require('./Pup_modules/delay')

async function RunAtomation() {
    const acessos = [
        { [process.env.USER_MG]: process.env.PASSWORD_MG },
        { [process.env.USER_PR]: process.env.PASSWORD_PR },
        { [process.env.USER_SP]: process.env.PASSWORD_SP },
        { [process.env.USER_MG2]: process.env.PASSWORD_MG2 }
    ]

    const siteUrl = process.env.URL
    const browser = await puppeteer.launch({
        headless: false,
        protocolTimeout: 90000
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(siteUrl, { waitUntil: 'networkidle2' });

    let indiceAtual = 0

    while (indiceAtual < acessos.length) {

        try {
            const obj = acessos[indiceAtual];
            const cnpj = Object.keys(obj)[0];
            const senha = obj[cnpj];

            // Realiza Login
            await page.waitForSelector('#username')
            await new Promise(resolve => setTimeout(resolve, 5000));
            await page.type('#username', cnpj, { delay: 200 })
            await page.type('#password', senha, { delay: 300 })
            await page.click('#app > div.container.justify-content-center > div > div > form:nth-child(6) > div.text-center > button')
            await new Promise(resolve => setTimeout(resolve, 5000));

            await page.type('#app > div:nth-child(3) > div.wrapper-page-title > div > div > div.col-lg-12.p-3.text-center > form > div > div:nth-child(1) > div > input', 
                            "S032186872", 
                            { delay: 200 })
            await new Promise(resolve => setTimeout(resolve, 3000));
            await page.click('#app > div:nth-child(3) > div.wrapper-page-title > div > div > div.col-lg-12.p-3.text-center > form > div > div:nth-child(3) > div > div.col-3.col-md-2.align-items-center.d-flex.d-md-block > button')
            await new Promise(resolve => setTimeout(resolve, 10000));

            // Clica para sair
            await page.waitForSelector('#app > div.div-header > div > div.header-first-row.row.pt-3.d-flex.align-items-center > div.col-6.d-lg-none > div > div > div > a')
            await page.click('xpath/' + '//*[@id="app"]/div[2]/div/div[1]/div[3]/div/div/div/a')
            await new Promise(resolve => setTimeout(resolve, 5000));
            // Clica para ir para a tela de login
            await page.click('xpath/' + '//*[@id="app"]/div[2]/div/div[1]/div[3]/div/div/a/button')

            indiceAtual++;
        } catch (error) {
            console.log(`Erro no acesso com a chave ${Object.keys(acessos[indiceAtual])[0]}. Tentando novamente...`);
            indiceAtual++;
            console.log(error)
            // Não incrementa o indiceAtual, para tentar novamente no mesmo objeto
        }
    }
}

RunAtomation()