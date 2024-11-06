const {test,expect} = require('@playwright/test')
const {POManager} = require('../pageobjects/POManager');

test("account creation", async ({browser})=>{
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
    await homePage.navigateToCreateAccount();
    const createAccountPage = poManager.getCreateAccountPage();
    await createAccountPage.validAccountCreation(firstName,lastName, email, "Test123!", "Test123!");
    const accountPage = poManager.getAccountPage();
    const thankYouMessage = await accountPage.messages.textContent()
    expect(thankYouMessage.trim()).toEqual("Thank you for registering with Main Website Store.");
    let accountDetails = await accountPage.accountDetails.textContent();
    accountDetails = accountDetails.trim();
    let accountDetailsArr = accountDetails.split("\n");
    console.log(accountDetailsArr);
    expect(accountDetailsArr[0].trim()).toEqual(firstName + " "+lastName);
    expect(accountDetailsArr[1].trim()).toEqual(email.toLowerCase());
    page.close();
});