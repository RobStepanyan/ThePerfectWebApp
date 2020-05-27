from rest_framework import viewsets
from rest_framework.response import Response
from .models import Repo
from .serializers import RepoSerializer
import requests, json
from django.http import Http404

class RepoViewSet(viewsets.ViewSet):
    def fetch_and_retrieve(self, request, username):
        """
        Sends request to Github API and receives
        repo info or Not found message.
        """
        req = requests.get(f'https://api.github.com/users/{username}/repos')
        if 'message' in req.json():
            raise Http404(req.json()['message'])
            
        for repo in req.json():
            Repo(
                full_name=repo['full_name'],
                private=repo['private'],
                owner=repo['owner'],
                html_url=repo['html_url'],
                description=repo['description'],
                created_at=repo['created_at'],
                updated_at=repo['updated_at'],
            ).save()
        __class__.retrieve(request, request, username)

    def retrieve(self, request, username):
        """
        Retrieves repo info from DB or Github API
        """
        queryset = Repo.objects.filter(owner__login__iexact = username) or None
        if queryset:
            serializer = RepoSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            __class__.fetch_and_retrieve(self, request, username)
