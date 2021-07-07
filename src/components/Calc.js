import React, { useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBBtn, MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import NumberFormat from 'react-number-format';
import iandooley from "./../images/iandooley.jpg";



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
        <MDBCol md="12">
          <MDBCard>
          <MDBCardImage className="img-fluid" src={iandooley} />
            <MDBCardBody className="mx-4 mt-2">
              <p className='error'>{error}</p>
                <form onSubmit={handleSubmit}>
                  {!results.isResult ? (
                    <div>
                      <div className="header px-5 grey lighten-2 text-center">
                      <h3 className="deep-grey-text mt-1 mb-1 pb-1 mx-1">
                        Enter your details below
                      </h3>
                    </div>
                      <p className='h5 text-left my-5'>Details from your electricity bill </p>
                        <label className="d-flex py-3 grey-text">Your average daily usage (how much you import from the grid in kwh)</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="dailyUsage" onChange={handleChange} value={formData.dailyUsage || ""} />
                        
                            
                        <label className="d-flex py-3 grey-text">Your average daily feed-in (the amount you export to the grid in kwh)</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="feedIn" onChange={handleChange} value={formData.feedIn || ""} />
                        
                      
                      <p className='h5 text-left mt-5'>Details from your electricity provider</p>
                        <label className="d-flex py-4 grey-text">Electricity fee ($ per kwh)</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="fee" onChange={handleChange} value={formData.fee || ""} />
                        
                        <label className="d-flex py-3 grey-text">Daily connection charge ($)</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="connectCharge" onChange={handleChange} value={formData.connectCharge || ""} />
                        
                        <label className="d-flex py-3 grey-text">Daily solar metering service charge ($)</label>
                          <NumberFormat className="d-flex px-1 py-1" decimalScale={4} fixedDecimalScale={true} name="serviceCharge" onChange={handleChange} value={formData.serviceCharge || ""} />
                        
                      <div className="mb-2 mt-4 py-1 text-left">
                        <MDBBtn
                          gradient="blue" rounded
                          type="submit"
                          className="btn-block z-depth-2">
                            Submit
                        </MDBBtn>
                      </div>
                      <div className="mt-4 text-center">
                      Photo by <a href="https://unsplash.com/@sadswim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ian dooley</a> on <a href="https://unsplash.com/s/photos/hot-air-balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                      </div>
                    </div>
                ) : (
                    <div>
                      <p className='h5 text-left my-3'>You've entered the following data</p>
                      <MDBContainer className="d-flex">
                        <MDBListGroup style={{ width: "30rem" }}>
                          <MDBListGroupItem>Your average daily usage (kwh): {formData.dailyUsage} </MDBListGroupItem>
                          <MDBListGroupItem>Your provider's electricity fee ($ per kwh): {formData.fee}</MDBListGroupItem>
                          <MDBListGroupItem>Your provider's daily connection charge ($): {formData.connectCharge}</MDBListGroupItem>
                          <MDBListGroupItem>Your provider's daily solar metering service charge ($): {formData.serviceCharge}</MDBListGroupItem>
                          <MDBListGroupItem>Your average daily feed-in (kwh): {formData.feedIn}</MDBListGroupItem>
                        </MDBListGroup>
                      </MDBContainer>
                      <MDBContainer className="blue lighten-4 px-5 pb-3 text-center">
                        <p className='h3 text-center mt-5 mb-4'>Results </p>
                        <p>Based on your inputs, you need the following feed-in tariff to break even on your electricity bill.</p>
                        <p>Anything above this value will likely push your bill into credit.</p>
                        <div>
                          <label className="h5 d-flex py-2 mt-4 mb-3">Your required feed-in tariff ($ per kwh)   
                          <NumberFormat decimalScale={2} fixedDecimalScale={true} value={results.requiredFeedIn} />
                          </label>
                        </div>
                      </MDBContainer>
                      {/* Button to clear fields */}
                        <div className="mb-1 mt-4 py-1 text-center">
                          <input
                            className='btn-block z-depth-2 my-5 blue lighten-4 rounded py-2 px-2'
                            value='CALCULATE AGAIN'
                            type='button'
                            onClick={clearFields}
                          />
                        </div>
                        <p>Note: This is a simple calculator and may not cover all of the variables used by your system. It is meant to be used as a rough guide. To be as accurate as possible, this calculator requires your average daily usage based on at least one year's worth of data.</p>
                    </div>
                      )}
                  </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
  );
}
  
export default Calc;