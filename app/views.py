# app/views.py
from app import app
import os
#from app import app
from flask import render_template_string, render_template
from flask import Flask, request, jsonify, render_template


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/resultado')
def resultado():
    return render_template('resultado.html')

@app.route('/resultado-doc')
def resultado_doc():
    return render_template('resultado-doc.html')