# Generated by Django 3.0.2 on 2020-02-29 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scoutingtool', '0004_auto_20200215_1339'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('scouter', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('matches', models.CharField(blank=True, default='', max_length=9999)),
            ],
        ),
    ]