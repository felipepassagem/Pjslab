# Generated by Django 4.0.3 on 2022-04-15 00:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_dentist_id_remove_job_id_dentist_dentistid_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dentist',
            old_name='dentistId',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='job',
            old_name='jobId',
            new_name='id',
        ),
    ]