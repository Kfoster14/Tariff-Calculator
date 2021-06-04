import React, { useReducer, useState} from 'react'
import {LabelContainer} from './StyledComponents'

const formReducer = (state, event) => {
  if(event.reset) {
    return {
      dailyUsage: 0,
      fee: 0,
      connectCharge: 0,
      serviceCharge: 0,
      feedIn: 0,
    }
  }
  
  return {
    ...state,
    [event.name]: event.value
  }
}

const Calc = () => {
  const [formData, setFormData] =useReducer(formReducer, {});
  
  const [submitting, setSubmitting] = useState(false);

  const [results, setResults] = useState()

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 5000);
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
    
      <form onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <label>
            Your average daily usage:
          <input type="number" name="dailyUsage" onChange={handleChange} value={formData.dailyUsage || 0} />
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            Your provider's electricity fee:
          <input type="number" name="fee" onChange={handleChange} value={formData.fee || 0} />
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            Your provider's daily connection charge:
          <input type="number" name="connectCharge" onChange={handleChange} value={formData.connectCharge || 0} />
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            Your provider's daily solar metering service charge ($):
          <input type="text" name="serviceCharge" onChange={handleChange} value={formData.serviceCharge || 0} />
          </label>
        </fieldset>
        <fieldset disabled={submitting}>    
          <label>
            Your average daily feed-in (the amount you export to the grid in kwh):
          <input type="text" name="feedIn" onChange={handleChange} value={formData.feedIn || 0} />
          </label>
        </fieldset>
            
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
      {submitting && 
          <div>
            You are submitting the following:
            <ul>
              {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>:{value.toString()}</li>
              ))}
            </ul>
          </div>}
      </LabelContainer>
    )
  }
  
  export default Calc