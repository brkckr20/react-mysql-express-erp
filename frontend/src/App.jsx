import { Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import FirmaSabitleri from './pages/GenelBilgiler/FirmaSabitleri'
import FirmaKarti from './pages/Kartlar/FirmaKarti'
import UlkeKarti from './pages/Kartlar/UlkeKarti'
import MalzemeKartiTanimlamalari from './pages/MalzemeIslemleri/MalzemeKartiTanimlamalari'
import MalzemeGiris from './pages/MalzemeIslemleri/MalzemeGiris'
import MalzemeCikis from './pages/MalzemeIslemleri/MalzemeCikis'
import Footer from './components/Footer'

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
          <Route exact path="/malzeme-giris">
            <MalzemeGiris />
          </Route>
          <Route exact path="/malzeme-cikis">
            <MalzemeCikis />
          </Route>
          <Route exact path="/">
            <div>Anasayfa</div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
