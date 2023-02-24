import { useEffect, useState } from "react";

function Modal({onClose,userInModal,setUsers,users}){
    const [modalUser,setUser] = useState(userInModal)
    const handleName =(e)=>{
        setUser({...modalUser,name:e.target.value})
    }
    const handleEmail = (e)=>{
        setUser({...modalUser,email:e.target.value})
    }
    const handleRole = (e)=>{
        setUser({...modalUser,role:e.target.value})
    }
    useEffect(()=>{
        return ()=>{
            console.log("unmouting the component");
        }
    },[users]);
    var closeClicked=false;
    const validateEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!closeClicked){
            let afterEditUsers = users.map(user=>{
                if(user.id === modalUser.id){
                    if(modalUser.name !== '' && modalUser.email !== "" && modalUser.role !=='' && validateEmail.test(modalUser.email))
                    user = modalUser
                }
                return user;
            })
            setUsers(afterEditUsers);
        }
        onClose();
    }
    return (
        <div>
            <div className="fixed inset-0 bg-gray-100 opacity-50"></div>
            <div className="flex justify-center pt-5 fixed inset-x-80 top-20 bottom-40 text-white rounded-md bg-[#485460] border-solid border-2">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="mr-5">Name:</label>
                        <input value={modalUser.name} type="text" onChange={handleName} className="px-1 py-1 bg-white border border-slate-300 rounded-md"/>
                        {modalUser.name === '' && <p className="pl-16  text-red-500 text-sm">UserName cannot be empty</p>}
                    </div> 
                    <div className="mt-3">
                        <label className="mr-6">Email:</label>
                        <input value={modalUser.email} type="text" onChange={handleEmail} className="px-1 py-1 bg-white border border-slate-300 rounded-md"/>
                        {modalUser.email === '' && <p className="pl-16  text-red-500 text-sm">Email cannot be empty</p>}
                        {!validateEmail.test(modalUser.email) && modalUser.email !=='' && <p className="pl-16  text-red-500 text-sm">Enter valid email</p>}
                    </div>
                    <div className="mt-3">
                        <label className="mr-8">Role:</label>
                        <input value={modalUser.role} type="text" onChange={handleRole} className="px-1 py-1 bg-white border border-slate-300 rounded-md"/>
                        {modalUser.role === '' && <p className="pl-16  text-red-500 text-sm">Role cannot be empty</p>}
                    </div>
                    <div className="mt-8 text-center">
                        <button className="bg-green-500 rounded text-white px-2 py-1 mr-5">Confirm </button>
                        <button className="bg-red-500 rounded text-white px-2 py-1" onClick={()=>closeClicked=true}>Cancel</button>
                    </div>    
                </form>
            </div>
        </div>
    )
}
export default Modal;