import puppeteer from 'puppeteer';

import { mockData } from '../mock-data';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
   
   browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    }); 
   // browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event'); // wait for events to be loaded
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .show'); // similar to queryselector
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .show');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .show');
    expect(eventDetails).toBeNull();
  });

});

describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event'); 
  });

  afterAll(() => {
    browser.close();
  });

  afterEach(async() => {
   await page.$eval('.city', el => el.value = '');
   await page.reload();
  })

  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    const eventDetails = await page.$$('.event'); // similar to queryselector
    //console.log(eventDetails.length);
    expect(eventDetails).toHaveLength(mockData.length);
  });

  test('User should see a list of suggestions when they search for a city.', async () => {
    await page.waitForSelector('.city');
    await page.type('.city','Berlin', {delay:100}); // types Berlin slowly like a user
    await page.waitForSelector('.suggestions li');
   //const suggestionsListLength=await page.$eval('ul',(nodeElement) => { return nodeElement.children; });
    const suggestionsList = await page.$$('.suggestions > li');
    //console.log(suggestionsListLength.length);
    expect(suggestionsList).toHaveLength(2);
  });

  test(' User can select a city from the suggested list', async () => {
    await page.waitForSelector('.city');
    await page.type('.city','Berlin'); // types Berlin fastly
    await page.waitForSelector('.suggestions li');
  
    const suggestionsList = await page.$$('.suggestions > li');
    expect(suggestionsList).toHaveLength(2);
    await suggestionsList[0].click();
    const eventDetails = await page.$$('.event'); // similar to queryselector
    //console.log(eventDetails.length);
    expect(eventDetails).toHaveLength(2);
  });

});


