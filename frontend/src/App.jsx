import { Switch, Route } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
import { dbGetir } from './pages/globalApi'
import Navbar from './components/Navbar'
import FirmaSabitleri from './pages/GenelBilgiler/FirmaSabitleri'
import FirmaKarti from './pages/Kartlar/FirmaKarti'
import UlkeKarti from './pages/Kartlar/UlkeKarti'
import MalzemeKartiTanimlamalari from './pages/MalzemeIslemleri/MalzemeKartiTanimlamalari'
import MalzemeGiris from './pages/MalzemeIslemleri/MalzemeGiris'
import MalzemeCikis from './pages/MalzemeIslemleri/MalzemeCikis'
import Footer from './components/Footer';
import BirimKodlama from './pages/Kodlama/BirimKodlama';
import Anasayfa from './pages/Anasayfa';


function App() {
  useEffect(() => {
    dbGetir().then(data => localStorage.setItem("dbName", JSON.stringify(data.data[0])))
  }, [])

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
          {/* kodlama menüsü */}
          <Route exact path="/birim-kodlama">
            <BirimKodlama />
          </Route>
          <Route exact path="/">
            <Anasayfa />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
