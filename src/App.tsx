import React, { useState } from "react";
import "./App.css";
import { Sehirler } from "./Data/SehirlerData";
import { SehirAdi } from "./Components/SehirAdi";
import { Klavye } from "./Components/Klavye";
import { AdamCizme } from "./Components/AdamCizme";

//rastgele şehir seçen fonksiyon
function SehirGetir() {
  return Sehirler[Math.floor(Math.random() * Sehirler.length)];
}

function App() {
  //şehir adının tutulduğu state
  const [tahminEdilecekSehir, setTahminEdilecekSehir] = useState(SehirGetir());

  //tahmin edilen harflerin tutulduğu state
  const [tahminEdilenHarfler, setTahminEdilenHarfler] = useState<string[]>([]);

  //tahmin edilen harflerin atamasının yapıldığı fonksiyon
  const TahminEdilenHarfiEkleme = (harf: string) => {
    if (tahminEdilenHarfler.includes(harf)) return;
    setTahminEdilenHarfler((harfler) => [...harfler, harf]);
  };

  //tahmin edilen harfler yanlış harfleri tutan dizi
  const yanlisHarfler = tahminEdilenHarfler.filter(
    (harf) => !tahminEdilecekSehir.includes(harf)
  );

  //toplam yanlış tahmin sayısı 6 ya eşit ise kaybeder
  const Kaybettin = yanlisHarfler.length >= 6;
  
  //tahminEdilecekSehir in içindeki her harf tahminEdilenHarfler de var ise kazanır
  const Kazandın = tahminEdilecekSehir
    .split("")
    .every((harf) => tahminEdilenHarfler.includes(harf));

  return (
    <div className="App">
      <div className="OyunDurumuContainer">
        {Kazandın && <div className="Kazandiniz">Kazandınız!</div>}
        {Kaybettin && <div className="Kaybettiniz">Kaybettiniz!</div>}
        {Kazandın || Kaybettin ? (
          <button
            className="YenileButon"
            onClick={() => window.location.reload()}
          >
            Yeniden Oyna
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="SehirAdiKlavyeContainer">
        <SehirAdi
          tahminEdilecekSehir={tahminEdilecekSehir}
          tahminEdilenHarfler={tahminEdilenHarfler}
          gorunurYap={Kaybettin}
        />
        <Klavye
          TahminEdilenHarfiEkleme={TahminEdilenHarfiEkleme}
          disabled={Kazandın || Kaybettin}
          activeHarfler={tahminEdilenHarfler.filter((harf) =>
            tahminEdilecekSehir.includes(harf)
          )}
          inactiveHarfler={yanlisHarfler}
        />
      </div>
      <div>
        <AdamCizme yanlisHarfSayisi={yanlisHarfler.length} />
      </div>
    </div>
  );
}

export default App;
