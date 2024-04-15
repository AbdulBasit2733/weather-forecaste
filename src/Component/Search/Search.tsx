const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="search-engine w-full flex flex-col space-y-4 justify-around items-center mt-10 mb-5 sm:flex-row sm:space-y-0">
      <input
        type="text"
        className="city-search sm:w-[70%] border rounded-md h-[3rem] py-2 px-5 text-lg outline-none text-indigo-600 font-semibold"
        placeholder="Enter City Name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button
        className="search-btn border rounded-lg bg-indigo-600 text-white font-semibold text-lg outline-none px-3 py-2"
        onClick={handleSearch}
      >
        Search Weather
      </button>
    </div>
  );
};

export default Search;
