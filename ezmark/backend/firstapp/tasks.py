# tasks.py

from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_notification_email(subject, message, recipient_list):
    send_mail(subject, message, 'votre_email@example.com', recipient_list)
