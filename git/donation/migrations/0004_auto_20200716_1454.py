# Generated by Django 3.0.6 on 2020-07-16 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0003_auto_20200716_1453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donation',
            name='zip_code',
            field=models.IntegerField(),
        ),
    ]
