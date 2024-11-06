const {AccountPage} = require('./AccountPage');
const {CreateAccountPage} = require('./CreateAccountPage');
const {HomePage} = require('./HomePage');
class POManager
{
constructor(page)
{
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.accountPage = new AccountPage(this.page);
    this.createAccountPage = new CreateAccountPage(this.page);


}

getHomePage()
{
    return this.homePage;
}

getAccountPage()
{
    return this.accountPage;
}

getCreateAccountPage()
{
    return this.createAccountPage;
}
}
module.exports = {POManager};