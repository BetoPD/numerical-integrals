import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mainpage from './components/Mainpage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Mainpage />} />
            <Route path="/explanation" element={<h1>Why?</h1>} />
            <Route path="/about" element={<h1>About?</h1>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
