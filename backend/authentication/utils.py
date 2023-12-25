def user_profile_picture_path(instance, filename):
    # Assuming 'instance' is a User instance
    return f'authentication/images/{instance.username}/{filename}'


