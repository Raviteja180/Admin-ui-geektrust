import { useState,useEffect } from "react";

function SearchUsers({users,setUsers,getSearchValue}){
    const [searchValue,setSearchValue] = useState('')
    const handleSearch = (val)=>{
        setSearchValue(val);  
        getSearchValue(val);
    }
    return (
        <div className="flex justify-center mt-5">
            <label className="px-5 py-2"><h2>Search Users</h2></label>
            <input className="w-3/5 px-1 py-1 bg-white border border-slate-300 rounded-md" type="search" name="" id=""  value={searchValue} onChange={(e)=>handleSearch(e.target.value)}/>
        </div>
    )
}
export default SearchUsers;