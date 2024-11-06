const {test, expect} = require('@playwright/test');

class HomePage{

    constructor(page){
        this.page = page;
        this.createAccount = page.getByRole('link', { name: 'Create an Account' });
        this.signIn = page.getByRole('link', { name: 'Sign In' });
        this.email = page.locator("#email");
        this.password = page.locator("input[name='login[password]']");
        this.submit = page.getByRole('button', { name: 'Sign In' });
        this.loggin = page.locator(".logged-in");
        this.buttonChange = page.getByRole('banner').locator('button').filter({ hasText: 'Change' });
        this.signOut = page.getByRole("link", {name:"Sign Out"});
        this.myAccount = page.getByRole("link", {name:"My Account"});

        this.emailError = page.locator("#email-error");
        this.passwordError = page.locator("#pass-error");

        this.pageTitle = page.locator(".page-title");

    }

    async goTo()
    {
        await this.page.goto("https://magento.softwaretestingboard.com");
        await this.page.waitForLoadState("networkidle");
    }

    async navigateToSignIn()
    {
        await this.signIn.click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
    }

    async userSignOut()
    {
        await this.page.waitForLoadState("networkidle");
        await this.buttonChange.waitFor();
        await this.buttonChange.click();
        await this.signOut.waitFor();
        await this.signOut.click();
        await this.page.waitForLoadState("networkidle");
    }

    async userAccount()
    {
        await this.page.waitForLoadState("networkidle");
        await this.buttonChange.waitFor();
        await this.buttonChange.click();
        await this.myAccount.waitFor();
        await this.myAccount.click();
        await this.page.waitForLoadState("networkidle");
    }

    async navigateToCreateAccount()
    {
        await this.createAccount.click();
        await this.page.waitForLoadState("networkidle");
    }


    async login(email, password)
    {
        await this.email.waitFor();
        await this.email.fill(email);
        await this.password.fill(password);
        await this.submit.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
    }
}


module.exports = {HomePage}