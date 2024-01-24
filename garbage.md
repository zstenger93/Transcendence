# garbage.md

# API Endpoints

## Register -> Post
- Input
{
    "email":"sioudazer8@gmail.com",
    "username":"realuser",
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
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNjA5NzYzMCwiaWF0IjoxNzA2MDExMjMwLCJqdGkiOiJkNzYyYzdiNjQ1NzY0OWExOTVkN2VkNzQ3YzZjOGEwNyIsInVzZXJfaWQiOjJ9.tQuNOeL_J6Lr9lB7JfmN4bTnGvj_ga9fyQwJ0OslnT4",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MDk3NjMwLCJpYXQiOjE3MDYwMTEyMzAsImp0aSI6IjBiYzI2N2UwMTc4YjQ3MGE5MTEzZjIwYzFkZjVkNTFmIiwidXNlcl9pZCI6Mn0.7-cr7nGgyROSiXSKEtWrW1lCXxMGoUoJp9xGg81FGM0"
}


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
- No Input, Check your email ;)

## TwoFactorAuth -> Post
>> Must contain "Authorization: JWT your_token" in the header
- Input: {"otp_code":"your_otp_code"}


# Missing Endpoints:
- Password Reset
- Update Profile (e.g Update Picture, name, etc)
- Look for a match / Start Match / Save Score
- 


## Tools
Header Changer: https://chromewebstore.google.com/detail/requestly-open-source-htt/mdnleldcmiljblolnjhpnblkcekpdkpa
