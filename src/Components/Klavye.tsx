import React from "react";
import { KlavyeHarfleri } from "../Data/KlavyeHarfleri";

type KlavyeProps = {
  TahminEdilenHarfiEkleme: (harf: string) => void;
  disabled?: boolean;
  activeHarfler: string[];
  inactiveHarfler: string[];
};

export const Klavye = ({
  TahminEdilenHarfiEkleme,
  disabled,//harfe tıklanmışsa yada oyun bitmişse butonlara disabled özelliği aktif olur
  activeHarfler,//doğru olan harf tıklandığında rengini ayarlar
  inactiveHarfler,//yanlış olan harf tıklandığında rengini ayarlar
}: KlavyeProps) => {
  return (
    <div className="KlavyeComponent">
      {KlavyeHarfleri.map((KlavyeHarf) => {
        const isActive = activeHarfler.includes(KlavyeHarf);
        const isInactive = inactiveHarfler.includes(KlavyeHarf);
        return (
          <button
            className={`KlavyeButon ${isActive ? "ActiveButon" : ""} ${
              isInactive ? "InactiveButon" : ""
            }`}
            key={KlavyeHarf}
            onClick={() => TahminEdilenHarfiEkleme(KlavyeHarf)}
            disabled={isInactive || isActive || disabled} 
          >
            {KlavyeHarf}
          </button>
        );
      })}
    </div>
  );
};
