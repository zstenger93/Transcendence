from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.core.validators import validate_slug
from django.core.validators import validate_email as validate_email_django
from django.contrib.auth.password_validation import validate_password as validate_password_django

UserModel = get_user_model()

# i guess this actually registering the user in the database (renaming would benice :P)
def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()
    # checking if the email is properly formatted according to 
    # the rules defined in the RFC 5322 specification
    if not email:
        raise ValidationError('Please provide an email address')
    try:
        validate_email_django(email)
    except ValidationError:
        raise ValidationError('Invalid email format')
    if UserModel.objects.filter(email=email).exists():
        raise ValidationError("This email is already in use")
    # using Django's built-in password validation, don't have to reinvent the wheel
    if not password:
        raise ValidationError('Please provide a password')
    try:
        validate_password_django(password)
    except ValidationError as e:
        raise ValidationError(e.messages)
    # checking if the input consists only of letters, numbers, hyphens, or underscores
    if not username:
        raise ValidationError('Please provide a username')
    try:
        validate_slug(username)
    except ValidationError:
        raise ValidationError('Invalid username format')
    if UserModel.objects.filter(username=username).exists():
        raise ValidationError('This username is already in use')
    return data


# these should be renamed to what they actually do (since checking the input fields)
def validate_email(data):
	email = data['email'].strip()
	if not email:
		raise ValidationError('Please provide an email address')
	return True

def validate_username(data):
	username = data['username'].strip()
	if not username:
		raise ValidationError('Please provide a username')
	return True

def validate_password(data):
	password = data['password'].strip()
	if not password:
		raise ValidationError('Please provide a password')
	return True