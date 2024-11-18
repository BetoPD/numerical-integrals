import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mainpage from './components/Mainpage';
import { Toaster } from 'react-hot-toast';
import NotFound from './components/NotFound';
import Explanation from './components/Explanation';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Mainpage />} />
            <Route path="/explanation" element={<Explanation />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
