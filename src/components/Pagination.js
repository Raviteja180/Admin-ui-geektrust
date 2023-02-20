import className from "classnames";

function Pagination({totalUsers,usersPerPage,setCurrentPage,currentPage}){
    let pages = [];
    for(let i=1;i<=Math.ceil(totalUsers.length/usersPerPage);i++){
        pages.push(i);
    }
    let noOfPages = pages.map((pageNo)=>{
        let classes =  pageNo === currentPage ? className("rounded px-2 py-1 mx-1 border-blue-500 border-2 border-solid"):className("rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid");
        return <button  className ={classes} key={pageNo} onClick={()=>setCurrentPage(pageNo)}>
                {pageNo}
            </button>
    })
    return (
        <>
            <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(1)}>{'<<'} </button>
            <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(currentPage -1)}> {'<'} </button>
            {noOfPages}
            <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(currentPage+1)}>{'>'} </button>
            <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(pages.length)}> {'>>'} </button>
        </>
    )
}
export default Pagination;