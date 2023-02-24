import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import SearchUsers from "./SearchUsers";
import Pagination from "./Pagination";
import Modal from "./Modal";

function ViewUsersList(){
    const [users,setUsers] = useState([])
    const [currentPage,setCurrentPage] = useState(1);
    const [showModal,setShowModal] = useState(false);
    const [userInModal,setUserInModal]= useState({});
    const [checkMultipleUsers,setCheckMultipleUsers] = useState(false);
    const [searchValue,setSearchValue] = useState('');
    const usersPerPage = 10;
    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
            let users = response.data;
            let finalUsers = users.map((user)=>{
                return {...user,'isActive':true}
            })
            setUsers(finalUsers)
        };
        fetchData();    
    },[]);
    useEffect(()=>{
        users.map((user)=>{
            user.isActive = true;
            return user;
        })
        setCheckMultipleUsers(false);
    },[currentPage])   
    const handleDeleteUser = (e,id)=>{
        let tusers =users.filter((user)=>user.id !== id)
        setUsers(tusers);
    }
    const lastUserIndex = currentPage * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;
    const handleEditUser = (user)=>{
       setShowModal(true);
       setUserInModal(user)
    }
    const handleClose = ()=>{
        setShowModal(false)
    }
    const handleCheckbox = (e,user)=>{
        user.isActive = !user.isActive;
        setUsers([...users])
    }
    const handleDeleteSelectedUsers = () =>{
        let afterDeleteUsers = users.filter((user)=>user.isActive===true)
        setUsers(afterDeleteUsers);
        setCheckMultipleUsers(false);
        setCurrentPage(1);
    }
    const handleHeaderCheckbox =()=>{
        if(checkMultipleUsers === false){
            users.filter(user=>user.name.startsWith(searchValue)  || user.email.startsWith(searchValue) || user.role.startsWith(searchValue)).slice(firstUserIndex,lastUserIndex).map((user)=>{
                user.isActive = false;
                return user;
            })
            setUsers([...users])
        }
        else{
            users.filter(user=>user.name.startsWith(searchValue) || user.email.startsWith(searchValue) || user.role.startsWith(searchValue)).slice(firstUserIndex,lastUserIndex).map((user)=>{
                user.isActive= true;
                return user;
            })
            setUsers([...users]);
        }
        setCheckMultipleUsers(!checkMultipleUsers)
    }
    const  getSearchValue = (val)=>{
        setSearchValue(val);
        setCurrentPage(1);
    }
    const renderUsers = users.filter(user=>user.name.startsWith(searchValue) || user.email.startsWith(searchValue) || user.role.startsWith(searchValue)).slice(firstUserIndex,lastUserIndex).map((user,index)=>{
        return  (
            <tr key={index} className={(!user.isActive)?"bg-[#a5b1c2] text-black":""}>
                <td className="w-1/5 text-center ">
                    <input type="checkbox"  checked={!user.isActive} onChange={(e)=>handleCheckbox(e,user)}/>
                </td>
                <td className="w-1/5 text-center ">
                    {user.name}
                </td>
                <td className="w-1/5 text-center ">
                    {user.email.slice(0,25)} <br />
                    {user.email.slice(25)}
                </td>
                <td className="w-1/5 text-center ">
                    {user.role}
                </td>
                <td className="w-100px flex justify-center">
                    <FaRegEdit  className="mr-2" onClick={()=>handleEditUser(user)} />
                    <AiFillDelete  onClick={(e)=>handleDeleteUser(e,user.id)} />
                </td>     
            </tr>            
        )
    })
    return (
        <div>
            <SearchUsers users={users} setUsers={setUsers} getSearchValue={getSearchValue}/>
            <div className="tableData">

                <table className="table-fixed mt-5 mx-auto bg-[#FAD8B9] rounded-lg text-black">
                    <thead>
                    {users.filter(user => user.name.startsWith(searchValue) || user.email.startsWith(searchValue) || user.role.startsWith(searchValue)).length>0 && 
                        <tr>   
                            <th className="w-1/5">
                                <input type="checkbox"  checked={checkMultipleUsers} onChange={handleHeaderCheckbox}/>
                            </th>
                            <th className="w-1/5">Name</th>
                            <th className="w-1/5">Email</th>
                            <th className="w-1/5">Role</th>
                            <th className="w-1/5">Actions</th>
                        </tr>
                    }
                    </thead>
                    <tbody>
                        {renderUsers}
                    </tbody>
                </table>
            </div>
            <div className="mt-10 ml-20">
                <button className="bg-red-500 rounded text-white px-2 py-2 mx-20 mr-40" onClick={handleDeleteSelectedUsers}>Delete Selected Users</button>
                <Pagination  totalUsers={users && users.filter(user => user.name.startsWith(searchValue) || user.email.startsWith(searchValue) || user.role.startsWith(searchValue)) } usersPerPage={usersPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            {showModal && <Modal onClose = {handleClose} userInModal={userInModal} setUsers={setUsers} users={users} />}
        </div>
    )
}
export default ViewUsersList;