const { defineParameterType, When, Given,Then, And } = require("@cucumber/cucumber")
let poManager 
const data = require('../support/data.json');
const {expect} = require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');


  Given('create the user details', function () {
    // Write code here that turns the phrase above into concrete actions
    this.firstname = "test"+Date.now();
    this.lastname = "demo";
    this.email = this.firstname+"."+this.lastname+"@test.com";
    this.password = "Test123!";
    this.confirmPassword = "Test123!"
  });


  Then('Check for the Thank you message {string}', async function (message) {
    this.accountPage = poManager.getAccountPage();
    const thankYouMessage = await this.accountPage.messages.textContent()
    expect(thankYouMessage.trim()).toEqual(message);
    
  });


  Then('Account details on account page', async function () {
    let accountDetails = await this.accountPage.accountDetails.textContent();
    accountDetails = accountDetails.trim();
    let accountDetailsArr = accountDetails.split("\n");
    expect(accountDetailsArr[0].trim()).toEqual(this.firstname + " "+this.lastname);
    expect(accountDetailsArr[1].trim()).toEqual(this.email);
  });


  Given('user details firstname {string} lastname {string} email {string} password {string} and confirm password {string}', {timeout:20*1000}, async function (firstname, lastname, email, password, confirmPassword) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword

    
  });


  Then('create account using above details', ({timeout:30*1000}),async function () {
    poManager = new POManager(this.page);
    this.homePage = poManager.getHomePage();
    await this.homePage.goTo();
    await this.homePage.navigateToCreateAccount();
    this.createAccountPage = poManager.getCreateAccountPage();
    await this.createAccountPage.validAccountCreation(this.firstname,this.lastname, this.email, this.password, this.confirmPassword);
  });


  Then('Check for the field Error message {string}', async function (errorMessage) {
    if(this.firstname.trim().length==0){
      const firstnameError = await this.createAccountPage.firstNameError.textContent();
      expect(firstnameError).toEqual(errorMessage);
    }
    if(this.lastname.trim().length==0){
      const lastnameError = await this.createAccountPage.lastNameError.textContent();
      expect(lastnameError).toEqual(errorMessage);
    }
    if(this.email.trim().length==0){
      const emailError = await this.createAccountPage.emailError.textContent();
      expect(emailError).toEqual(errorMessage);
    }
    if(this.password.trim().length==0){
      const passwordError = await this.createAccountPage.passwordError.textContent();
      expect(passwordError).toEqual(errorMessage);
    }
    if(this.confirmPassword.trim().length==0){
      const confirmPasswordError = await this.createAccountPage.confirmPasswordError.textContent();
      expect(confirmPasswordError).toEqual(errorMessage);
    }
  });


  Then('Check for the login field Error message {string}', async function (errorMessage) {
    if(this.password.trim().length==0){
      const passwordError = await this.homePage.passwordError.textContent();
      expect(passwordError).toEqual(errorMessage);
    }
    if(this.email.trim().length==0){
      const emailError = await this.homePage.emailError.textContent();
      expect(emailError).toEqual(errorMessage);
    }
  });


  Then('Check for the Error message {string}', async function (errorMessage) {
    const error = await this.createAccountPage.errorMessage.textContent();
    expect(error.trim()).toEqual(errorMessage);
  });


  Then('Check for the field {string} Error message {string}', async function (field, errorMessage) {
    if(field === 'email'){
      const emailError = await this.createAccountPage.emailError.textContent();
      expect(emailError).toEqual(errorMessage);
    }
    else if(field === 'password'){
      const passwordError = await this.createAccountPage.passwordError.textContent();
      expect(passwordError).toEqual(errorMessage);
    }
    else if(field === 'confirm_password'){
      const confirmPasswordError = await this.createAccountPage.confirmPasswordError.textContent();
      expect(confirmPasswordError).toEqual(errorMessage);
    }
  });


  When('account details already exists.', function () {
    this.firstname = data.valid_user.firstname;
    this.lastname = data.valid_user.lastname;
    this.email = data.valid_user.email;
    this.password = data.valid_user.password;
    this.confirmPassword = data.valid_user.confirm_password;
  });


  Given('Get the user details from json file', function () {
    this.email = data.valid_user.email;
    this.password = data.valid_user.password;
    
  });

  Then('login with the valid credentials', ({timeout:30*1000}), async function () {
    await this.homePage.login(this.email, this.password);

  });


  Then('Valid logged in user on account page',({timeout:40*1000}), async function () {
    this.accountPage = poManager.getAccountPage();
    await this.homePage.userAccount();
    let accountDetails = await this.accountPage.accountDetails.textContent();
    accountDetails = accountDetails.trim();
    let accountDetailsArr = accountDetails.split("\n");
    expect(accountDetailsArr[1].trim()).toEqual(this.email.toLowerCase());
  });


  Then('Signout the user', async function(){
    await this.homePage.userSignOut();
  });

  Then('Verify signout message {string}', async function (message) {
    let signOutMessage = await this.homePage.pageTitle.textContent();
    expect(signOutMessage.trim()).toEqual(message)
  });

  Then('login with the valid email and invlaid password for multiple times', ({timeout:30*1000}),async function(){
    this.password = this.password+"12";
    await this.homePage.login(this.email, this.password);
  });

  Given('Login with the {string} and {string}', ({timeout:30*1000}),async function (email, password) {
    this.email = email;
    this.password = password;
    await this.homePage.login(this.email, this.password);
  });

  Given('user navigate to login screen', ({timeout:40*1000}), async function () {
    poManager = new POManager(this.page);
    this.createAccountPage = poManager.getCreateAccountPage();
    this.homePage = poManager.getHomePage();
    await this.homePage.goTo();
    await this.homePage.navigateToSignIn();
  });