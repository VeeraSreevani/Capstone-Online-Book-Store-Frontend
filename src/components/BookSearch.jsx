import React from 'react';
import {useState} from 'react';

function BookSearch({onSearch}){
    const[query,setQuery]= useState('');//state to hold search query

    const handleChange=(e)=>{
        setQuery(e.target.value);//updates query  
    };

    const handleSearch=(e)=>{
        e.preventDefault();//prevent form submission
        onSearch(query);//call onSearch
    };

    return(
        <form onSubmit={handleSearch} className='flex items-center space-x-2'>
            <input type="text" 
                    value={query}
                    onChange={handleChange}
                    placeholder='Search by Title/Author'
                    className='px-4 py-2 border rounded-md text-black'/>
            <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Search</button>
        </form>
    )
}
export default BookSearch;