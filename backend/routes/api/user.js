

/* Modify the user table to store OAuth info
Eg:When the user logins with OAuth get the details and check if it is already present
Check for email
If present :
    check if it is a OAuth entry and set the userId
    else:
        Not OAuth return error
else:
    create an entry with Oauth flag true and password null
*/
