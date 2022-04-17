import './App.css';
import { Navbar, SideNav, RequiresAuth } from './component/component-index';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  Login,
  Signup,
  Archive,
  Label,
  Delete,
  Explore,
} from './page/page-index';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        <Routes>
          <Route
            path="/label"
            element={
              <RequiresAuth>
                <Label />
              </RequiresAuth>
            }
          />
          <Route
            path="/archive"
            element={
              <RequiresAuth>
                <Archive />
              </RequiresAuth>
            }
          />
          <Route
            path="/trash"
            element={
              <RequiresAuth>
                <Delete />
              </RequiresAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequiresAuth>
                <HomePage />
              </RequiresAuth>
            }
          />

          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
