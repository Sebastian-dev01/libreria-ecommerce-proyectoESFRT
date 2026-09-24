import LibraryNavbar from "../components/navegation/LibraryNavbar";
import './LibraryLayout.css'


const LibraryLayout = ({ children }) => {
  return (
    <div className="library-layout">
      <LibraryNavbar className="library-navbar" />

      <main className="library-main">
        {children}
      </main>

      <footer className="library-footer">
        FOTTER
      </footer>
    </div>
  );
}

export default LibraryLayout;
