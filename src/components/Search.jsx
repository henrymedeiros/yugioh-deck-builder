const Search = ({setSearchTerm}) => {

    return ( 
    
    <div className="Search area">
         <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          
        
    </div> );
}
 
export default Search;