# Generated by Django 2.2.4 on 2019-08-22 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Results_Page', '0002_auto_20190803_2127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='name',
            field=models.CharField(max_length=3),
        ),
    ]
