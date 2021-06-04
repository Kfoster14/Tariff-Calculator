import React from 'react'

function validate (values) {
    let errors = {}; 
    if (!values.dailyUsage) {
        errors.dailyUsage = 'Number is required';
      }
    return errors;
}