import { Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import FirmaSabitleri from './pages/GenelBilgiler/FirmaSabitleri'
import FirmaKarti from './pages/Kartlar/FirmaKarti'
import UlkeKarti from './pages/Kartlar/UlkeKarti'
import MalzemeKartiTanimlamalari from './pages/MalzemeIslemleri/MalzemeKartiTanimlamalari'

function App() {

  return (
    <div className='h-full flex bg-gray-100'>
      <Navbar />
      <div className='bg-white w-full'>
        <Switch>
          <Route exact path="/ulke-karti">
            <UlkeKarti />
          </Route>
          <Route exact path="/firma-karti">
            <FirmaKarti />
          </Route>
          <Route exact path="/firma-sabitleri">
            <FirmaSabitleri />
          </Route>
          <Route exact path="/malzeme-karti-tanimlamalari">
            <MalzemeKartiTanimlamalari />
          </Route>
          <Route exact path="/">
            <div>Anasayfa</div>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
