from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponse

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated and not isinstance(request.user, AnonymousUser):
            return HttpResponse(status=401)  # Unauthorized
        return self.get_response(request)
