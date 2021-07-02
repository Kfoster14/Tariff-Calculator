import React, { useState} from 'react';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import NumberFormat from 'react-number-format';
import {LabelSummary, FormItems
} from './StyledComponents';
import './Calc.css';



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
            <MDBContainer>
              <MDBCard>

              <MDBCardBody className="mx-4 mt-4">
                <p className='error'>{error}</p>
                  <form onSubmit={handleSubmit}>
                  {!results.isResult ? (
                    <FormItems>
                      <h3>Enter your details below:</h3>
                        <label>Your average daily usage:
                          <NumberFormat decimalScale={4} fixedDecimalScale={true} name="dailyUsage" onChange={handleChange} value={formData.dailyUsage || ""} />
                        </label>
                            
                        <label>Your average daily feed-in:
                          <NumberFormat decimalScale={4} fixedDecimalScale={true} name="feedIn" onChange={handleChange} value={formData.feedIn || ""} />
                        </label>
                      <br />
                      <h3>Your provider's details:</h3><br />
                        <label>Electricity fee:
                          <NumberFormat decimalScale={4} fixedDecimalScale={true} name="fee" onChange={handleChange} value={formData.fee || ""} />
                        </label>
                      
                        <label>Daily connection charge:
                          <NumberFormat decimalScale={4} fixedDecimalScale={true} name="connectCharge" onChange={handleChange} value={formData.connectCharge || ""} />
                        </label>
                        <label>Daily solar metering service charge ($):
                          <NumberFormat decimalScale={4} fixedDecimalScale={true} name="serviceCharge" onChange={handleChange} value={formData.serviceCharge || ""} />
                        </label>
                      <MDBBtn
                        color="danger"
                        type="submit"
                        className="btn-block z-depth-2">
                          Submit
                      </MDBBtn>
                    </FormItems>
                ) : (
                    <LabelSummary>
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
                    </LabelSummary>
                      )}
                    </form>
                  </MDBCardBody>
              </MDBCard>
            </MDBContainer>
    
  );
}
  
export default Calc;