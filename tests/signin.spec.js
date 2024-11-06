const {test,expect} = require('@playwright/test')
const {POManager} = require('../pageobjects/POManager');

test("signin creation", async ({browser})=>{
    const context = await browser.newContext({
        bypassCSP: false
    });
    const page = await context.newPage();
    const poManager = new POManager(page);
    let firstName = "test";
    let lastName = "demo2";
    let email = "test4.demo3@test.com";
    const homePage = poManager.getHomePage();
    await homePage.goTo();
    await homePage.navigateToSignIn();
    await homePage.login("test.demo2@test.com", "Test123!");
    const accountPage = poManager.getAccountPage();
    await homePage.userAccount();
    let accountDetails = await accountPage.accountDetails.textContent();
    accountDetails = accountDetails.trim();
    let accountDetailsArr = accountDetails.split("\n");
    console.log(accountDetailsArr);
    expect(accountDetailsArr[0].trim()).toEqual(firstName + " "+lastName);
    expect(accountDetailsArr[1].trim()).toEqual(email);
    page.close();
});