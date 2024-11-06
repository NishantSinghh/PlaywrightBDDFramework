Feature: Account validations

		Scenario: create valid account 
		Given create the user details
		Then create account using above details
		Then Check for the Thank you message "Thank you for registering with Main Website Store."
		And Account details on account page
		

		Scenario Outline: create missing account details
		Given user details firstname "<firstname>" lastname "<lastname>" email "<email>" password "<password>" and confirm password "<confirm_password>"
		Then create account using above details
		And Check for the field Error message "This is a required field."

			Examples:
			| firstname    	    | 	lastname  |		email   		|	password	|	confirm_password	|
			|  		  			|  			  |						|				|						|
			|  test				|	demo	  |  test.demo@test.com	|	Test123! 	|						|
			|  test				|	demo	  |  test.demo@test.com	|	 			|	Test123! 			|
			|  test				|	demo	  |  					|	Test123! 	|	Test123!			|
			|  					|	demo	  |  test.demo@test.com	|	Test123! 	|	Test123!			|
			|  test				|			  |  test.demo@test.com	|	Test123! 	|	Test123!			|


		

		Scenario Outline: create with invalid account details 
		Given user details firstname "<firstname>" lastname "<lastname>" email "<email>" password "<password>" and confirm password "<confirm_password>"
		Then create account using above details
		And Check for the field "<field>" Error message "<messages>"

			Examples:
			| firstname    	    | 	lastname  |		email   		|	password	|	confirm_password	|	field				|		messages																													|
			|  test				|	demo	  |  test.demotest.com	|	Test123! 	|	Test123! 			|	email				|		Please enter a valid email address (Ex: johndoe@domain.com).																|
			|  test				|	demo	  |  test.demo@test.com	|	Test123! 	|	Test223! 			|	confirm_password	|		Please enter the same value again.																							|
			|  test				|	demo	  |  test.demo@test.com	|	T2! 		|	T2!					|	password			|		Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.			|


		Scenario: create account with existing email
		When account details already exists.
		Then create account using above details
		And Check for the Error message "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account."

       
