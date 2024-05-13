import { useState, useEffect } from 'react';
import axios from 'axios';
import './Countries.css';

const Countries = () =>
{
    const [countries, setCountries] = useState([]);
    const [name, setName] = useState('');

    useEffect(() =>
    {
        getCountries();
    },[]);

    const getCountries = async () =>
    {
        try
        {
            const url = 'https://restcountries.com/v3.1/all';
            const response = await axios.get(url);
            setCountries(response.data);    
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    const filteredCountries = name !== '' ? [...countries].filter((country) => country.name.common.toLowerCase().includes(name)) : countries;

    return(
        <div className='container'>
            <input type='text' className='searchbar' placeholder='Search for countries' onChange={(e)=>setName(e.target.value)}/>
            <div className='wrapper'>
                {filteredCountries.map((country)=>
                (
                <div className='countryCard' key={country.name.common}>
                    <img src={country.flags.png} alt={country.flags.alt}/>
                    <p>{country.name.common}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Countries
