import './App.css';
import LogoBar from './Componentes/LogoBar';
import Navbar from './Componentes/Navbar';

function App() {


  return (

    <div>
      <LogoBar/>
      <Navbar/>
      <div className='texto-header'>
        <h1>Bienvenido a <p>@cuartavoleibol</p></h1>
      </div>
    </div>
    
  );
}

export default App;