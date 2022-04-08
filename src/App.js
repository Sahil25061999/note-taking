import './App.css';
import { Navbar, SideNav } from './component/component-index';
import { Routes, Route } from 'react-router-dom';
import { HomePage, Login, Signup, Archive } from './page/page-index';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        <SideNav />
        <Routes>
          <Route path="/archive" element={<Archive />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
