import Player from "../components/Player";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";

function SearchPage() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Search />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export default SearchPage;
