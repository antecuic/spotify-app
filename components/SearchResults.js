import SearchResult from "./SearchResult";

/* eslint-disable @next/next/no-img-element */
function SearchResults({ items, title, handleItemPress }) {
  return (
    <div className="mt-20 md:mt-30">
      <h1 className="heading ml-5 sm:ml-0 mb-5">{title}</h1>
      <div className="whitespace-nowrap overflow-x-auto scrollbar-hide space-x-5 ml-5 sm:ml-0">
        {items.map((item) => {
          const imageUrl =
            item.album?.images?.[0]?.url || item?.images?.[0]?.url;

          return (
            <div
              key={item.id}
              className="inline-block w-48 h-64 cursor-pointer bg-white/10 text-gray-500 hover:text-white hover:bg-white/20 transition-all rounded-md"
              onClick={() => handleItemPress(item.id)}
            >
              <SearchResult imageUrl={imageUrl} name={item.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
