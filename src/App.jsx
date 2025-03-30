import axios from "axios";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IoBookSharp } from "react-icons/io5";

function App() {
  const [book, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(6);
  const [search, setSearch] = useState('');
  const [filBook, setFilBook] = useState(book);

  const [list, setList] = useState(true)
 ///use effect for fetching data
  useEffect(() => {
    axios
      .get(
        `https://api.freeapi.app/api/v1/public/books?limit=12&page=${pageCount}`
      )
      .then((response) => {
        setBooks(response.data.data.data);
        setFilBook(response.data.data.data)
        // console.log(response);
      });
  }, [pageCount]);

  const nextpage = () => {
    if (pageCount <= 17) {
      setPageCount(pageCount + 1);
    }
  };

  const prevpage = () => {
    if (pageCount >= 2) {
      setPageCount(pageCount - 1);
    }
  };

  const handlesearch = (e) => {
    const search = e.target.value
    setSearch(search)
    console.log(search);


// danger zone

const filteredItems = book.filter((book) =>
  (book.volumeInfo.title?.toLowerCase().includes(search.toLowerCase())) ||  (book.volumeInfo.authors?.join('').toLowerCase().includes(search.toLowerCase()))

  );

  setFilBook(filteredItems.length ? filteredItems : book )
    
  }

  
useEffect(() => {
}, [search])


console.log(list);


  return (
    <>
      <div className="w-full fixed flex justify-between px-5 py-2 bg-amber-200">
        <div className=" flex gap-2 justify-center items-center">
        <h1 className="text-3xl">Movie App </h1>
       <h1 className="pt-2"> <IoBookSharp  className="text-3xl"/></h1>
        </div>
       <div>
       <input type="text" value={search} className="bg-amber-100 rounded-xl p-1 px-3" onChange={handlesearch} />
      
       </div>
      </div>
      <div  className="pt-15">
        <h3 className="flex gap-4 justify-end px-6 ">
          <p onClick={()=>{setList(true)}} className={list? "cursor-pointer text-3xl p-2  bg-blue-500 text-amber-50 rounded-3xl": "cursor-pointer text-3xl p-2 text-black hover:bg-blue-500 hover:text-amber-50 rounded-3xl"}> <CiBoxList /></p>
          <p onClick={()=>{setList(!true)}}  className={!list? "cursor-pointer text-3xl p-2  bg-blue-500 text-amber-50 rounded-3xl": "cursor-pointer text-3xl p-2 text-black hover:bg-blue-500 hover:text-amber-50 rounded-3xl"}><CiGrid41 /></p>
        </h3>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3">
      <div className={list? "w-full flex p-2 gap-2 justify-around font-bold": "hidden"}>
              <h1 className="w-[100px] flex justify-center"></h1>
              <h1  className="w-[100px] flex justify-center">Title's</h1>
              <h1  className="w-[100px] flex justify-center">Author's</h1>
              <h1  className="w-[100px] flex justify-center">Publishing Date</h1>
              <h1  className="w-[100px] flex justify-center">Publication</h1>
             </div>
        {filBook.map((book, key) => (
          <div
            key={key}
            className={list ? "w-full h-[220px] p-2 rounded-xl flex  justify-around items-center shadow-xl" : "w-[350px] h-[500px] p-2 rounded-xl flex gap-2 flex-col justify-center items-center shadow-2xl"}
          >
           <img
  className={list? 'w-[100px]  rounded-lg hover:shadow-2xl' : "h-[300px] rounded-lg hover:shadow-2xl"}
  src={
    book.volumeInfo?.imageLinks?.thumbnail ||
    "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
  }
  alt="Book Thumbnail"
/>
             
            <h1 className={list? 'w-[100px]' : ''}>{book.volumeInfo.title || 'no title'}</h1>
            <p className={list? 'w-[100px]' : ''}>{book.volumeInfo.authors || 'unknown '}</p>
            <p className={list? 'w-[100px]' : ''}>{book.volumeInfo.publishedDate || 'unkonwn'}</p>
            <p className={list? 'w-[100px]' : ''}>
              {book.volumeInfo.publisher || "Unkown Publisher"}
            </p>

            
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-5">
        <p className="text-3xl shadow-2xl" onClick={prevpage}>
          ⬅️
        </p>
        <p>{pageCount - 1}</p>
        <p className="text-3xl bg-amber-400 px-2 rounded-4xl ">{pageCount}</p>
        <p>{pageCount + 1}</p>
        <p className="text-3xl shadow-2xl" onClick={nextpage}>
          ➡️
        </p>
      </div>
    </>
  );
}

export default App;
