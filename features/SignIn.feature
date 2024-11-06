Feature: Account validations

		Scenario: SignIn valid account 
		Given user navigate to login screen
		When Get the user details from json file
		Then login with the valid credentials
		And Valid logged in user on account page
		

		Scenario Outline: login with invalid details 
		Given user navigate to login screen
		When Login with the "<email>" and "<password>"
		Then Check for the Error message "<message>"

			Examples:
			|		email   			|	password	|	message																														|
			|  unknown.invalid@test.com	|	Test123! 	|	The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.					|
			|  test.demo2@test.com		|	WrongPass2!	|	The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.					|
			|  test.demo2@test.com		|	TeST123!	|	The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.					|
			

		Scenario Outline: login with missing details 
		Given user navigate to login screen
		When Login with the "<email>" and "<password>"
		Then Check for the login field Error message "This is a required field."

			Examples:
			|		email   			|	password	|
			|  test.demo2@test.com		|				|
			|  							|	 			|
			|  							|	TeST123!	|

		
		Scenario: SignIn valid case insensitive username and valid password
		Given user navigate to login screen
		When Get the user details from json file
		Then Login with the "TeST.DemO2@tesT.com" and "Test123!"
		And Valid logged in user on account page


        Scenario: verify that user signOut successfully
		Given user navigate to login screen
		When Get the user details from json file
		Then login with the valid credentials
		Then Signout the user
		And Verify signout message "You are signed out"

		Scenario: verify that user account locked out
		Given user navigate to login screen
		When Get the user details from json file
		Then login with the valid email and invlaid password for multiple times
		And Check for the Error message "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."



		

       
