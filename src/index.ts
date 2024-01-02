import puppeteer from "puppeteer"
import fs from "fs"
import os from "os"
import path from "path"

interface ClientId {
  _id: string;
  name: string;
  phone: string;
}

interface InactiveClient {
  _id: ClientId;
  total: number;
  lastSale: string;
  soma: number;
  totalprice: number;
}

const inactiveClients: string[] = []

async function main () {
  console.log("Starting")

  let isFinished = false;

  async function finish(): Promise<void> {
    isFinished = true;
    await browser.close();

    console.log("\n\nInactive Clients:\n\n")

    for (const inactiveClient of inactiveClients) {
      console.log(inactiveClient)
    }

    // Get the user's home directory
    const homeDirectory = os.homedir();

    // Set the path to the desktop
    const desktopPath = path.join(homeDirectory, 'Desktop');

    // Specify the file path on the desktop
    const filePathOnDesktop = path.join(desktopPath, 'clientes-inativos.txt');

    fs.writeFileSync(filePathOnDesktop, inactiveClients.join("\n"));

    console.log("Finished");
  }

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    userDataDir: "./user_data",
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  let numberOfTablePages: undefined | number = undefined;

  const fetchTableItemsUrl = "auth/client/v2/report/dataclient/new-report?page"

  const inactiveClientsTabButton = "#anota-template > div > div.tabs-container > anota-tabs > div > div > anota-tabs-item:nth-child(2) > button"
  const selectOfAmountOfItensPerPage = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-select > div > div.sm.select-container.select-container__outline"
  const containerWithOptionsForAmountOfItemsPerPage = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-select > div > div.container-options.show-container-options.container-options--open > div"
  const lastOptionSelector = (numberOfOptions: number) => "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-select > div > div.container-options.show-container-options.container-options--open > div > div:nth-child(${numberOfOptions})"
  const nextPageButton = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-icon:nth-child(6)"
  const pageCountSelector = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > span:nth-child(3)"

  async function clickOnInactiveClientsTab () {
    await page.waitForSelector(inactiveClientsTabButton)
  
    await page.click(inactiveClientsTabButton)
  }

  async function showMaxItensPerPage () {
    await page.waitForSelector(selectOfAmountOfItensPerPage)
  
    await page.click(selectOfAmountOfItensPerPage)

    const numberOfOptions = await page.$eval(containerWithOptionsForAmountOfItemsPerPage, (element) => element.children.length)

    await page.waitForSelector(lastOptionSelector(numberOfOptions))

    const lastOption = await page.$(lastOptionSelector(numberOfOptions))

    lastOption?.click()
  }

  async function goToNextPage (currentPage: number) {
    const numberOfPages = await getNumberOfPages()

    if (currentPage >= numberOfPages) finish()
    
    await page.waitForSelector(nextPageButton)
  
    await page.click(nextPageButton)
  }

  async function getNumberOfPages () {
    if (numberOfTablePages) return numberOfTablePages;

    await page.waitForSelector(pageCountSelector)

    const newNumberOfPages = await page.$eval(pageCountSelector, (element) => element.textContent)
    
    if (newNumberOfPages) {
      numberOfTablePages = parseInt(newNumberOfPages)
      return numberOfTablePages
    }
    else throw new Error ("Nâo foi possível obter o número de páginas.");
  }

  // Navigate the page to a URL
  await page.goto('https://admin.anota.ai/main/reports/client');

  await clickOnInactiveClientsTab()
  await showMaxItensPerPage()

  // Intercept responses
  page.on('response', async (response) => {
    if (!response.url().includes(fetchTableItemsUrl)) return;

    const searchParams = new URL(response.url()).searchParams
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    
    console.log('Intercepted response URL:', response.url());

    console.log("Current Page:", page)
    if (limit === "10") {
      console.log("only 10 items")
      return;
    }

    try {
      const listOfInactiveClients = await response.json() as InactiveClient[];
      
      for (const inactiveClient of listOfInactiveClients) {
        inactiveClients.push(inactiveClient._id.phone)
      }
      
      
      if (listOfInactiveClients.length === 0) {
        finish()
      } else {
        await sleep(Math.random() * 1000)
        await goToNextPage(parseInt(page || "0") + 1)
      }
      
    } catch (e) {
      console.error(e)
    }
  });

  // Return a Promise that resolves when finish() is called
  return new Promise<void>((resolve) => {
    (async () => {
      while (!isFinished) {
        // Your main logic goes here
        await sleep(1000); // Adjust the interval as needed
      }
      resolve();
    })();
  });
}

async function sleep(ms: number): Promise<void> {
  await new Promise(resolve => {setTimeout(resolve, ms)})
}

main();