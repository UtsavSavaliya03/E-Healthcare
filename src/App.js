import './App.css';
import Header from './Components/Header/Header.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Main from './Components/Main/Main.jsx';

function App() {
  return (
    <div>
      <Header />
      <Sidebar>
        <Main />
      </Sidebar>
    </div>
  );
}

export default App;
