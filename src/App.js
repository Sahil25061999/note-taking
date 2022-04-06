import './App.css';
import { Navbar, SideNav } from './component/component-index';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './page/page-index';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        <SideNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
