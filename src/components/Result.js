import React from 'react'

const calculateResults = ({dailyUsage, fee, connectCharge, serviceCharge, feedIn}) => {
  const gst = 1.1;
  const usageFee = Number(dailyUsage) * Number(fee);
  const usageFeeGst = Number(usageFee) * Number(gst);
  const dailyConnectCharge = Number(connectCharge);
  const meterServiceCharge = Number(serviceCharge);
  const dailyFeedIn = Number(feedIn);
  const calculatedFeedIn = (usageFeeGst + dailyConnectCharge + meterServiceCharge) / dailyFeedIn;

  setResults({
    requiredFeedIn: calculatedFeedIn,
    isResult: true,
  });
  return;
};

const Result = () => {
    return (
      <div >
        <h1>Result - Your feed-in tariff to break even</h1>
        <p>Based on your inputs, you need the following feed-in tariff to break even on your electricity bill.</p>
        <p>Anything above this value will likely push your bill into credit.</p>
        <div>
          <label>Required feed-in tariff:</label>
          <input type='text' value={results.totalInterest} disabled 
          />
        </div>
      </div>
    )
  }
  
  export default Result

 