import puppeteer from "puppeteer"

async function main () {
  console.log("Starting")

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://picsum-image-viewer.netlify.app/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  let listOfArtists: string[] = []
  let stop = false;

  while (!stop) {
    await sleep(1000)

    const nextPageButton = await page.$("#__next > div > div > div.Home_header__y2QYS > nav > ul > li:nth-child(9) > button")
    const isLastPage = (await nextPageButton?.evaluate((node) => node.className))?.includes("Mui-disabled")
    
    for (let i = 1; i < 10; i++) {
      const artist = await page.$(`#__next > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2.css-isbt42 > div:nth-child(${i}) > div > h3`)
      const artistName = await artist?.evaluate((node) => node.textContent)
      
      if (artistName) listOfArtists.push(artistName)
    }
  
    if (isLastPage) {
      stop = true;
    } else {
      nextPageButton?.click()
    }
  }

  console.log("Finished")
  console.log("\n\nList of artists: ")

  for (const artistName of listOfArtists) {
    console.log(artistName)
  }
}

async function sleep(seconds: number): Promise<void> {
  await new Promise(resolve => {setTimeout(resolve, seconds)})
}

main();