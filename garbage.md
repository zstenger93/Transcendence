# garbage.md

# API Endpoints

## Deactivate extension

## Register -> Post
- Input
{
    "email":"sioudazer82@gmail.com",
    "username":"realuser2",
    "password":"xhq8mxhq8m"
}

## Login -> Post
- Input
{
    "email":"sioudazer8@gmail.com",
    "password":"xhq8mxhq8m"
}
Result <- 
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
}

## Put new access token to the extension

## Logout -> Post
>> Must contain "Authorization: JWT your_token" in the header
- No input

## Profile -> Get
>> Must contain "Authorization: JWT your_token" in the header
- No input


## Users -> Get
>> Must contain "Authorization: JWT your_token" in the header
- No Input

## activateTwoFa -> Post
>> Must contain "Authorization: JWT your_token" in the header
- No Input

## deactivateTwoFa -> Post
>> Must contain "Authorization: JWT your_token" in the header
- No Input

## sendQrCode -> Post
>> Must contain "Authorization: JWT your_token" in the header
- No Input, Check your email ;

## TwoFactorAuth -> Post
>> Must contain "Authorization: JWT your_token" in the header
- Input: {"otp_code":"your_otp_code"}


## UpdateProfile -> Post
>> Must contain "Authorization: JWT your_token" in the header
- Input: {"anyProfileField":"New Value"}
e.g {"AboutMe":"New About Me"}


## Tools
Header Changer: https://chromewebstore.google.com/detail/requestly-open-source-htt/mdnleldcmiljblolnjhpnblkcekpdkpa


## TODO
### MAKE A MORE SECURE WAY TO SAVE PWD, ALSO TO CHANGE IT

- check if the token is valid
- check if the token is expired

## Jamshidbek

### /block/
{
	"blocked_username":"realuser"
}

### /unblock/
{
	"blocked_username":"realuser"
}






