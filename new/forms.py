from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, SelectField
from wtforms.validators import DataRequired

from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField, SubmitField
from wtforms.validators import DataRequired, EqualTo


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
class SignupForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')
    
class StudentForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    roll_number = StringField('Roll Number', validators=[DataRequired()])
    submit = SubmitField('Add Student')

class CourseForm(FlaskForm):
    name = StringField('Course Name', validators=[DataRequired()])
    submit = SubmitField('Add Course')

class AttendanceForm(FlaskForm):
    student = SelectField('Student', coerce=int)
    present = SelectField('Present', choices=[('1', 'Yes'), ('0', 'No')])
    submit = SubmitField('Submit')

class MarkForm(FlaskForm):
    student = SelectField('Student', coerce=int)
    course = SelectField('Course', coerce=int)
    marks = IntegerField('Marks', validators=[DataRequired()])
    submit = SubmitField('Add Marks')

