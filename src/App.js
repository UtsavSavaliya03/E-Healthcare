import './App.css';
import Header from './Components/Header/Header.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Main from './Components/Main/Main.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App() {
  return (
    <div>
      <Header />
      <Sidebar>
        <Main />
        <Footer/>
      </Sidebar>
    </div>
  );
}

export default App;
