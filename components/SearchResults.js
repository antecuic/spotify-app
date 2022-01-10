/* eslint-disable @next/next/no-img-element */
function SearchResults({ items, title, handleItemPress }) {
  return (
    <div className="mt-20 md:mt-30">
      <h1 className="heading ml-5 sm:ml-0 mb-5">{title}</h1>
      <div className="whitespace-nowrap overflow-x-auto scrollbar-hide space-x-5 ml-5 sm:ml-0">
        {items.map((item) => {
          const imageUrl =
            title === "Songs"
              ? item.album?.images?.[0]?.url
              : item?.images?.[0]?.url;

          return (
            <div
              key={item.id}
              className="inline-block w-48 h-64 cursor-pointer bg-white/10 text-gray-500 hover:text-white hover:bg-white/20 transition-all"
              onClick={() => handleItemPress(item.id)}
            >
              <div className="w-40 h-40 m-auto mt-5 shadow-xl ">
                <img
                  src={
                    imageUrl ||
                    "https://images.unsplash.com/photo-1483032469466-b937c425697b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  }
                  alt="Item hero"
                  className="w-[100%] h-[100%]"
                />
                <h1 className=" text-ellipsis truncate mt-5 text-md">
                  {item.name}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
