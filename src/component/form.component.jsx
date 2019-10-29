import React from 'react';
import './form.style.css';
import cities from 'cities.json';

const Form = props => {
    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.loadweather}>
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City" />
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country" />
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            - select country -
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li id="c_l" className="dropdown-item"><a href="#"></a></li>
                        </ul>
                    </div>

                    {/* <div className="col-md-3 py-2">
                        <select className="form-control">
                            <option>- select city -</option>
                        </select>
                    </div>
                    <div className="col-md-3 py-2">
                        <select className="form-control">
                            <option>- select country -</option>
                        </select>
                    </div> */}

                    <div className="col-md-3 mt-md-0 py-2 text-md-left">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

console.log(cities[1000].name);

// let getCityName = () => {
//     let cityList = [...cities];
//     return cityList;
// };

// let lol = () => {
//     return cityList.map(getCityName);
// };

let error = () => {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    );
};

export default Form;