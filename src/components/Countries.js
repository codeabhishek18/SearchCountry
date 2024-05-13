import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Countries.module.css';

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
    
    const filteredCountries = name === '' ? countries : [...countries].filter((country) => country.name.common.toLowerCase().includes(name))

    return(
        <div className={styles.container}>
            <input className={styles.searchbar} placeholder='Search for countries' onChange={(e)=>setName(e.target.value)}/>
            <div className={styles.wrapper}>
                {filteredCountries.map((country)=>
                (
                <div className={styles.country} key={country.name.common}>
                    <img src={country.flags.png} alt={country.flags.alt}/>
                    <p>{country.name.common}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Countries