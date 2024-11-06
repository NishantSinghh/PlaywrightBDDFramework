class CreateAccountPage{

    constructor(page){
        this.page = page;
        this.firstName = page.locator("#firstname");
        this.lastName = page.locator("#lastname");
        this.email = page.locator("#email_address");
        this.password = page.locator("#password");
        this.confirmPassword = page.locator("#password-confirmation");
        this.submit = page.getByRole("button", {name:"Create an Account"});
        
        this.firstNameError = page.locator("#firstname-error");
        this.lastNameError = page.locator("#lastname-error");
        this.emailError = page.locator("#email_address-error");
        this.passwordError = page.locator("#password-error");
        this.confirmPasswordError = page.locator("#password-confirmation-error");

        this.errorMessage = page.locator("div[class='page messages']");
    }

    async validAccountCreation(firstName, lastName, email, password, confirmPassword)
    {
        await this.firstName.waitFor();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.submit.click();
        await this.page.waitForLoadState('networkidle');
    }


}


module.exports = {CreateAccountPage}