/* eslint-disable @next/next/no-img-element */
function SearchResult({ imageUrl, name }) {
  return (
    <div className="w-40 h-40 m-auto mt-5 shadow-xl ">
      <img
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1483032469466-b937c425697b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
        alt="Item hero"
        className="w-[100%] h-[100%]"
      />
      <h1 className=" text-ellipsis truncate mt-5 text-md">{name}</h1>
    </div>
  );
}

export default SearchResult;
