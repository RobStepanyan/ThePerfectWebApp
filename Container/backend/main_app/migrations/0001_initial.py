# Generated by Django 3.0.6 on 2020-05-22 10:47

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Repo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('full_name', models.CharField(max_length=150)),
                ('private', models.BooleanField()),
                ('owner', django.contrib.postgres.fields.jsonb.JSONField()),
                ('html_url', models.URLField()),
                ('description', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
    ]
