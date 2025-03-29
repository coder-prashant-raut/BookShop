import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [book, setBooks] = useState([]);
  const [pageCount, setPageCount] = useState(6);
  const [search, setSearch] = useState('');
  const [filBook, setFilBook] = useState(book);
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

 /// use effect for search change filter

//  useEffect(() => {
  
  
// }, [handlesearch]);





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
  book.volumeInfo.title.toLowerCase().includes(search.toLowerCase())
// book.volumeInfo.authors.toLowerCase().includes(search.toLowerCase())
  );

  setFilBook(filteredItems || book )
    
  }

  
useEffect(() => {
}, [search])




  return (
    <>
      <div className="w-full flex justify-between px-5 py-2 bg-amber-200">
        <h1>Movie App</h1>
       <div>
       <input type="text" value={search} className="bg-amber-100 rounded-xl p-1 px-3" onChange={handlesearch} />
      
       </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {filBook.map((book, key) => (
          <div
            key={key}
            className=" w-[350px] h-[500px] p-2 rounded-xl flex gap-2 flex-col justify-center items-center shadow-2xl"
          >
           <img
  className="h-[300px] rounded-lg hover:shadow-2xl"
  src={
    book.volumeInfo?.imageLinks?.thumbnail ||
    "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
  }
  alt="Book Thumbnail"
/>
            <h1>{book.volumeInfo.title || 'no title'}</h1>
            <p className=" ">{book.volumeInfo.authors || 'unknown '}</p>
            <p className=" ">{book.volumeInfo.publishedDate || 'unkonwn'}</p>
            <p className=" ">
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
