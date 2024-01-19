from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.core.validators import validate_slug, validate_email
from django.contrib.auth.password_validation import validate_password

UserModel = get_user_model()

def user_registration(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()
    # checking if the email is properly formatted according to 
    # the rules defined in the RFC 5322 specification
    if not email:
        raise ValidationError('Please provide an email address')
    try:
        validate_email(email)
    except ValidationError:
        raise ValidationError('Invalid email format')
    if UserModel.objects.filter(email=email).exists():
        raise ValidationError("This email is already in use")
    # using the built-in password validation instead, don't have to reinvent the wheel
    if not password:
        raise ValidationError('Please provide a password')
    try:
        validate_password(password)
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


def is_valid_email(data):
	email = data['email'].strip()
	if not email:
		raise ValidationError('Please provide an email address')
	return True

def is_valid_username(data):
	username = data['username'].strip()
	if not username:
		raise ValidationError('Please provide a username')
	return True

def is_valid_password(data):
	password = data['password'].strip()
	if not password:
		raise ValidationError('Please provide a password')
	return True