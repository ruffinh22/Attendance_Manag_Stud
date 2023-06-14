from flask import Flask, render_template, redirect, url_for , redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from forms import StudentForm, CourseForm, AttendanceForm, MarkForm
from forms import AttendanceForm, LoginForm, SignupForm
from model import Student, Attendance, Course, Mark, User
from flask_login import LoginManager, login_required, login_user, current_user, logout_user
from fabfile import db, app


migrate = Migrate(app, db)

login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return Student.query.get(int(user_id))

@app.route('/users', methods=['GET', 'POST'])
def users():
    form = SignupForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Registration successful. Please login.')
        return redirect(url_for('login'))
    return render_template('signup.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Registration successful. Please login.')
        return redirect(url_for('login'))
    return render_template('signup.html', form=form)
@app.route('/')
def home():
    return 'Welcome to the facial attendance student system!'

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        student = Student.query.filter_by(username=form.username.data).first()
        if student and student.check_password(form.password.data):
            login_user(student)
            return redirect(url_for('home'))
    
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/attendance', methods=['GET', 'POST'])
@login_required
def attendance():
    form = AttendanceForm()

    if form.validate_on_submit():
        student = current_user
        attendance = Attendance(student_id=student.id, is_present=form.is_present.data)
        db.session.add(attendance)
        db.session.commit()
        return redirect(url_for('home'))

    return render_template('attendance.html', form=form)

@app.route('/courses', methods=['GET', 'POST'])
@login_required
def courses():
    form = CourseForm()
    if form.validate_on_submit():
        # Add a new course to the database
        new_course = Course(name=form.name.data)
        db.session.add(new_course)
        db.session.commit()
        flash('Course added successfully!')
        return redirect('/courses')

    courses = Course.query.all()
    return render_template('courses.html', form=form, courses=courses)
    
@app.route('/students', methods=['GET', 'POST'])
@login_required
def students():
    form = StudentForm()
    if form.validate_on_submit():
        # Add a new student to the database
        new_student = Student(name=form.name.data, roll_number=form.roll_number.data)
        db.session.add(new_student)
        db.session.commit()
        flash('Student added successfully!')
        return redirect('/students')

    students = Student.query.all()
    return render_template('student.html', form=form, students=students)


@app.route('/marks', methods=['GET', 'POST'])
@login_required
def marks():
    form = MarkForm()
    form.student.choices = [(student.id, student.name) for student in Student.query.all()]
    form.course.choices = [(course.id, course.name) for course in Course.query.all()]

    if form.validate_on_submit():
        # Add marks for a student and course
        student_id = form.student.data
        course_id = form.course.data
        marks = form.marks.data

        new_mark = Mark(student_id=student_id, course_id=course_id, marks=marks)
        db.session.add(new_mark)
        db.session.commit()

        flash('Marks added successfully!')
        return redirect('/marks')

    marks = Mark.query.all()
    return render_template('marks.html', form=form, marks=marks)

if __name__ == '__main__':
    app.run(debug=True)
