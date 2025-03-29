import React, { useState } from 'react';
import './HousePricePredictor.css';

function HousePricePredictor(){
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [lease_term, setLeaseTerm] = useState('');
    const [type, setType] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [sq_feet, setSquareFeet] = useState('');
    const [furnishing, setFurnishing] = useState('');
    const [smoking, setSmoking] = useState('');
    const [pets, setPets] = useState(false);
    const [prediction, setPrediction] = useState('');

    function submitForm(event){
        event.preventDefault();
        const loginBackendEndpoint = "http://127.0.0.1:5000/predict_house_price";

        fetch(loginBackendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'city': city, 'province': province, 'latitude': latitude, 'longitude': longitude, 'lease_term': lease_term, 'type': type, 'beds': beds, 'baths': baths, 'sq_feet': sq_feet, 'furnishing': furnishing, 'smoking': smoking, 'pets': pets}),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.predicted_price) {
                setPrediction(response.predicted_price);
            } 
        })
        .catch(error => console.log("Error fetching data"));
    }

    
    return(
        <div className='toCenter'>
        <div className = "outerHouseContainer">
            <h1>House Price Predictor</h1>
            <form onSubmit={submitForm}>
                
                <label htmlFor="city">City:</label>
             
                <input type="text" id="city" name="city" required onChange={(e) => setCity(e.target.value)}/>
            
                
                <label htmlFor="province">Province:</label>
           
                <input type="text" id="province" name="province" required onChange={(e) => setProvince(e.target.value)}/>
              

                <label htmlFor="latitude">Latitude:</label>
             
                <input type="text" id="latitude" name="latitude" required onChange={(e) => setLatitude(e.target.value)}/>
              
                <label htmlFor="longitude">Longitude:</label>
              
                <input type="text" id="longitude" name="" required onChange={(e) => setLongitude(e.target.value)}/>

                <label htmlFor="lease_term">Lease Term:</label>
                
                <input type="text" id="lease_term" name="lease_term" required onChange={(e) => setLeaseTerm(e.target.value)}/>
                
                <label htmlFor="type">Type:</label>
                
                <input type="text" id="type" name="type" required onChange={(e) => setType(e.target.value)}/>
                
                <label htmlFor="beds">Beds:</label>
                
                <input type="text" id="beds" name="beds" required onChange={(e) => setBeds(e.target.value)}/>
                
                <label htmlFor="baths">Baths:</label>
                
                <input type="text" id="baths" name="baths" required onChange={(e) => setBaths(e.target.value)}/>
                
                <label htmlFor="sq_feet">Square Feet:</label>
                
                <input type="text" id="sq_feet" name="sq_feet" required onChange={(e) => setSquareFeet(e.target.value)}/>
                
                <label htmlFor="furnishing">Furnishing:</label>
                
                <select id="furnishing" name="furnishing" required onChange={(e) => setFurnishing(e.target.value)}>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="partially_furnished">Partially Furnished</option>
                    <option value="fully_furnished">Fully Furnished</option>
                </select>
                

                <label htmlFor="smoking">Smoking:</label>
                <input type="text" id="smoking" name="smoking" required onChange={(e) => setSmoking(e.target.value)}/>
            
                <label htmlFor= "pets">I have a pet: </label>
                <input type="checkbox" id="pets" name="pets" checked={pets} unchecked required onChange={(e) => setPets(e.target.checked)}/> 
            
                <br />
                <button type="submit" className = "buttonStyle" >Predict</button>
            </form>
            </div>
            {(prediction) && (
                <div className='predictionBox'>
                    {<div>Predicted Rent Price: {prediction}</div>}
                </div>
            )}
        </div>
    );
}

export default  HousePricePredictor; 