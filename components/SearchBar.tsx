"use client";

type TProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchText, setSearchText }: TProps) => {
  return (
    <input
      className="p-2 bg-[#6E6F70] w-full"
      value={searchText}
      onChange={(e) => setSearchText && setSearchText(e.target.value)}
      placeholder="search meals..."
    />
  );
};

export default SearchBar;
