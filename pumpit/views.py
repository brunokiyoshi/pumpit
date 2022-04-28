"""
Routes and views for the flask application.
"""
import os
from datetime import datetime
from flask import render_template, send_from_directory, Markup
from pumpit import app


@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    systemsvg = open(os.path.join('pumpit', 'static', 'svg', 'system.svg')).read()
    return render_template(
        'index.html',
        title='Home',
        year=datetime.now().year,
        systemsvg=Markup(systemsvg)
    )


@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )


@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )


@app.route('/getstdfittingstablerow')
def getstdtablerow():
    """Returns a new standard row."""
    return render_template("stdfittingstablerow.html")


@app.route('/generatereport')
def generatereport():
    """Generates some sort of report."""
    return 0