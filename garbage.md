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
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNzIxOTM1MSwiaWF0IjoxNzA3MTMyOTUxLCJqdGkiOiJkMTM2ZDIyYjc2NjI0NDk0OWRhZDU3MDYwZjVjOTE0NyIsInVzZXJfaWQiOjEsImVtYWlsIjoic2lvdWRhemVyOEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJlYWx1c2VyIn0.dUc-kYp91jYx1LNxiazHTHxKsbR78lyWTPMQWnMDH-o",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MjE5MzUxLCJpYXQiOjE3MDcxMzI5NTEsImp0aSI6ImRmYmJmNDgyN2MzNTQwM2NhNzFlODc3NjkyYjQzZjM1IiwidXNlcl9pZCI6MSwiZW1haWwiOiJzaW91ZGF6ZXI4QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmVhbHVzZXIifQ.0cjP1qZfUfrxiUophcscm3pMv0rJxN7LluokzmAan7w"
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
- No Input, Check your email ;

## TwoFactorAuth -> Post
>> Must contain "Authorization: JWT your_token" in the header
- Input: {"otp_code":"your_otp_code"}




## Tools
Header Changer: https://chromewebstore.google.com/detail/requestly-open-source-htt/mdnleldcmiljblolnjhpnblkcekpdkpa


## TODO
### MAKE A MORE SECURE WAY TO SAVE PWD, ALSO TO CHANGE IT

- check if the token is valid
- check if the token is expired
