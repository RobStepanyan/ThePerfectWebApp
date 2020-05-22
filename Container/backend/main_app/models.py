from django.db import models
from django.contrib.postgres.fields import JSONField

class Repo(models.Model):
    full_name = models.CharField(max_length=150)
    private = models.BooleanField()
    owner = JSONField() # owner['login'] is a username of owner
    html_url = models.URLField()
    description = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    last_updated = models.DateTimeField(auto_now=True)
