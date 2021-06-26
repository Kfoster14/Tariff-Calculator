import React, { useState} from 'react'
import NumberFormat from 'react-number-format';
import {LabelContainer, LabelItem, SubmitItem
} from './StyledComponents'
import {} from './StyledComponents'

const Calc = () => {
  const [formData, setFormData] =useState({
    dailyUsage: '',
    fee: '',
    connectCharge: '', 
    serviceCharge: '',
    feedIn: '',
  });
    
  const [results, setResults] = useState({
    requiredFeedIn: '',
    isResult: false,
  
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  // Validation of entered data
  const isValid = () => {
    const { dailyUsage, fee, connectCharge, serviceCharge, feedIn } = formData;
    let actualError = '';
    if (!dailyUsage || !fee || !connectCharge || !serviceCharge || !feedIn) {
      actualError = 'All values are required';
    }
    if (isNaN(dailyUsage) || isNaN(fee) || isNaN(connectCharge) || isNaN(serviceCharge) || isNaN(feedIn)) {
      actualError = 'All values must be a valid number';
    }
    if (dailyUsage <= 0 || fee <= 0 || connectCharge <= 0 || serviceCharge <= 0 || feedIn <= 0) {
      actualError = 'All values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(formData);
    }
  }
  
  const calculateResults = ({dailyUsage, fee, connectCharge, serviceCharge, feedIn}) => {
    const gst = 1.1;
    const usageFee = Number(dailyUsage) * Number(fee);
    const usageFeeGst = usageFee * gst;
    const dailyConnectCharge = Number(connectCharge);
    const meterServiceCharge = Number(serviceCharge);
    const dailyFeedIn = Number(feedIn);
    const calculatedFeedIn = (usageFeeGst + dailyConnectCharge + meterServiceCharge) / (dailyFeedIn);
    console.log(usageFee);
    console.log(usageFeeGst);
    console.log(dailyConnectCharge);
    console.log(meterServiceCharge);
    console.log(dailyFeedIn);
    console.log(calculatedFeedIn);
    
    setResults({
      requiredFeedIn: calculatedFeedIn,
      isResult: true,
    });
    return;
  };

  // Clear input fields
  const clearFields = () => {
    setFormData({
      dailyUsage: '',
      fee: '',
      connectCharge: '', 
      serviceCharge: '',
      feedIn: '',
    })
    setResults({
      requiredFeedIn: '',
      isResult: false,
    })
  }

  return (
    <LabelContainer>
      <div className='form'>
        <p className='error'>{error}</p>
        <form onSubmit={handleSubmit}>
          {!results.isResult ? (
            <div className="form-items">
              <LabelItem>
                <label>Your average daily usage:</label>
                <NumberFormat decimalScale={4} fixedDecimalScale={true} name="dailyUsage" onChange={handleChange} value={formData.dailyUsage || ""} />
              </LabelItem>
              <LabelItem>
                <label>Your provider's electricity fee:</label>
                <NumberFormat decimalScale={4} fixedDecimalScale={true} name="fee" onChange={handleChange} value={formData.fee || ""} />
              </LabelItem>
              <LabelItem>
                <label>Your provider's daily connection charge:</label>
                <NumberFormat decimalScale={4} fixedDecimalScale={true} name="connectCharge" onChange={handleChange} value={formData.connectCharge || ""} />
              </LabelItem>
              <LabelItem>
                <label>Your provider's daily solar metering service charge ($):</label>
                <NumberFormat decimalScale={4} fixedDecimalScale={true} name="serviceCharge" onChange={handleChange} value={formData.serviceCharge || ""} />
              </LabelItem>
              <LabelItem>    
                <label>Your average daily feed-in (the amount you export to the grid in kwh):</label>
                <NumberFormat decimalScale={4} fixedDecimalScale={true} name="feedIn" onChange={handleChange} value={formData.feedIn || ""} />
              </LabelItem> 
              <SubmitItem>
                <button type="submit" className="submit">Submit</button>
              </SubmitItem>
            </div>
        ) : (
            <div className="summary">
              <h2>You've entered the following data:</h2>
              <h4>
              Your average daily usage: {formData.dailyUsage} <br />
              Your provider's electricity fee: {formData.fee} <br />
              Your provider's daily connection charge: {formData.connectCharge} <br />
              Your provider's daily solar metering service charge ($): {formData.serviceCharge} <br />
              Your average daily feed-in (the amount you export to the grid in kwh): {formData.feedIn} <br />
              </h4>
              <h2>Results</h2>
              <p>Based on your inputs, you need the following feed-in tariff to break even on your electricity bill.</p>
              <p>Anything above this value will likely push your bill into credit.</p>
              <div>
                <label>Required feed-in tariff:</label>
                <NumberFormat decimalScale={9} fixedDecimalScale={true} value={results.requiredFeedIn} />
              </div>
              {/* Button to clear fields */}
              <input
                className='button'
                value='Calculate again'
                type='button'
                onClick={clearFields}
              />
            </div>
          )}
        </form>
      </div>
    </LabelContainer>  
  );
}
  
export default Calc;