#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

# {
#     "email":"test@gmail.com",
#     "username":"test",
#     "password":"password"
# }

# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA0MTA4NTA0LCJpYXQiOjE3MDQwMjIxMDQsImp0aSI6ImNmZTEzYjRjYzVmNzQ2NTY4OTRiMGJlNzZmNTBlZDNjIiwidXNlcl9pZCI6MX0.0zZJj7sZUcyTnCaAgdgOWDRUgY6uiL-TlfNqcati8yQ