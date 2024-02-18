
# USER API

## UserRegister class
	UserRegister is a class-based view in Django that handles user registration requests. It inherits from the APIView class provided by Django Rest Framework (DRF).
	The permission_classes attribute is set to AllowAny, which means any client, authenticated or not, can make a POST request to this view.
	The post method is defined to handle POST requests. This method takes in the request object as a parameter.
	Inside the post method, the first step is to clean the incoming data using the user_registration function. This function is not shown in the provided code, but it presumably validates and sanitizes the user registration data.
	The cleaned data is then passed to the UserRegisterSerializer for further validation and conversion into a Python data structure.
	If the serialized data is valid, a new user is created using the create method of the serializer.
	If the user is successfully created, a HTTP 201 response is returned with the serialized user data. The Access-Control-Allow-Credentials header is set to 'true' in the response.
	If a ValidationError is raised at any point during the process, a HTTP 400 response is returned with the error details. The Access-Control-Allow-Credentials header is also set to 'true' in this response.
	If the user creation fails for any other reason, a HTTP 400 response is returned without any details. The Access-Control-Allow-Credentials header is set to 'true' in this response as well.

