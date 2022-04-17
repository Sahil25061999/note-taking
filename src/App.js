import './App.css';
import { Navbar, SideNav } from './component/component-index';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  Login,
  Signup,
  Logout,
  Archive,
  Label,
  Delete,
  Explore,
} from './page/page-index';
import { useToken } from './context/token-context';

function App() {
  const { token } = useToken();
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        {token ? <SideNav /> : ''}

        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/label" element={<Label />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/trash" element={<Delete />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Explore />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
