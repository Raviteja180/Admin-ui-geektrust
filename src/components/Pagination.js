import className from "classnames";

function Pagination({totalUsers,usersPerPage,setCurrentPage,currentPage}){
    let pages = [];
    for(let i=1;i<=Math.ceil(totalUsers.length/usersPerPage);i++){
        pages.push(i);
    }
    let noOfPages = pages.map((pageNo)=>{
        let classes =  pageNo === currentPage ? className("rounded px-2 py-1 mx-1 border-black border-2 border-solid"):className("rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid");
        return <button  className ={classes} key={pageNo} onClick={()=>setCurrentPage(pageNo)}>
                {pageNo}
            </button>
    })
    return (
        <>
            {totalUsers.length>10 && currentPage!==1 && <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(1)}>{'<<'} </button>}
            {totalUsers.length>10 && currentPage > 1 && pages.length>1 && <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(currentPage -1)}> {'<'} </button>}
            {noOfPages}
            {totalUsers.length>10 && currentPage !==pages.length && pages.length>1 && <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(currentPage+1)}>{'>'} </button>}
            {totalUsers.length>10 && currentPage!==pages.length && <button className ="rounded px-2 py-1 mx-1 border-black-300 border-2 border-solid" onClick={()=>setCurrentPage(pages.length)}> {'>>'} </button>}
        </>
    )
}
export default Pagination;