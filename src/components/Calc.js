import React, { useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import NumberFormat from 'react-number-format';
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
    <MDBContainer >
      <MDBRow>
        <MDBCol md="6" className="block-example border border-dark">
        <div className="header px-5 py-3 grey lighten-2 text-center">
          <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
            Enter your details below
          </h3>
        </div>
              <p className='error'>{error}</p>
                <form onSubmit={handleSubmit}>
                  {!results.isResult ? (
                    <div>
                      <p className='h5 text-left my-4'>Details from your electricity bill </p>
                        <label className="d-flex py-3 grey-text">Your average daily usage</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="dailyUsage" onChange={handleChange} value={formData.dailyUsage || ""} />
                        
                            
                        <label className="d-flex py-3 grey-text">Your average daily feed-in</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="feedIn" onChange={handleChange} value={formData.feedIn || ""} />
                        
                      
                      <p className='h5 text-left my-4'>Details from your electricity provider</p>
                        <label className="d-flex py-3 grey-text">Electricity fee</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="fee" onChange={handleChange} value={formData.fee || ""} />
                        
                        <label className="d-flex py-3 grey-text">Daily connection charge</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="connectCharge" onChange={handleChange} value={formData.connectCharge || ""} />
                        
                        <label className="d-flex py-3 grey-text">Daily solar metering service charge ($)</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="serviceCharge" onChange={handleChange} value={formData.serviceCharge || ""} />
                        
                      <div className="mb-1 mt-4 py-3">
                        <MDBBtn
                          color="primary"
                          size="lg"
                          type="submit"
                          className="btn-block z-depth-2">
                            Submit
                        </MDBBtn>
                      </div>
                    </div>
                ) : (
                    <div>
                      <p className='h5 text-left my-4'>You've entered the following data</p>
                      <h4>
                      Your average daily usage: {formData.dailyUsage} <br />
                      Your provider's electricity fee: {formData.fee} <br />
                      Your provider's daily connection charge: {formData.connectCharge} <br />
                      Your provider's daily solar metering service charge ($): {formData.serviceCharge} <br />
                      Your average daily feed-in (the amount you export to the grid in kwh): {formData.feedIn} <br />
                      </h4>
                      <p className='h5 text-left my-4'>Results </p>
                      <p>Based on your inputs, you need the following feed-in tariff to break even on your electricity bill.</p>
                      <p>Anything above this value will likely push your bill into credit.</p>
                      <div>
                        <label className="d-flex py-3 grey-text">Required feed-in tariff:</label>
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
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
  );
}
  
export default Calc;