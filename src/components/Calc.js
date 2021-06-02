import React, { useReducer, useState} from 'react'
import {LabelContainer} from './StyledComponents'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const Calc = () => {
  const [formData, setFormData] =useReducer(formReducer, {});
  
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  }
  
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
      <LabelContainer>
        <h1>Calculator</h1>
        {submitting && 
          <div>
            You are submitting the following:
            <ul>
              {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>:{value.toString()}</li>
              ))}
            </ul>
          </div>}
    
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Your average daily usage:
          <input type="number" name="dailyUsage" onChange={handleChange} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Your provider's electricity fee:
          <input type="number" name="fee" onChange={handleChange} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Your provider's daily connection charge:
          <input type="number" name="connectionCharge" onChange={handleChange} />
          </label>
        </fieldset>
          <label>
            Your provider's daily solar metering service charge ($):
          <input type="text" name="serviceCharge" onChange={handleChange} />
          </label>
        <fieldset>    
          <label>
            Your average daily feed-in (the amount you export to the grid in kwh):
          <input type="text" name="feedIn" onChange={handleChange} />
          </label>
        </fieldset>
            
        <button type="submit">Submit</button>
      </form>
      </LabelContainer>
    )
  }
  
  export default Calc