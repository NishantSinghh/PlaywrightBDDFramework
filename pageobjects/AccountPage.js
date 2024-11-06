class AccountPage{

    constructor(page){
        this.page = page;
        this.pageTitle = page.locator(".page-title");
        this.accountDetails = page.locator(".box-content").nth(0)
        

        this.messages = page.locator("div[class='page messages']"); 
    }

    async validAccountCreation(firstName, lastName, email, password, confirmPassword)
    {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.submit.click();
        await this.page.waitForLoadState('networkidle');
    }


}


module.exports = {AccountPage}