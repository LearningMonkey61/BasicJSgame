from django.db import models

# Create your models here.
class Result(models.Model):
	score=models.IntegerField()
	name=models.CharField(max_length=3)

	def __str__(self):
		return f'{self.name}\t{self.score}'

	class Meta:
		ordering=('-score','name')