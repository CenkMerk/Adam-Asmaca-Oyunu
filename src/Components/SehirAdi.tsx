import React from "react";
type SehirAdiProps = {
  tahminEdilecekSehir: string;
  tahminEdilenHarfler: string[];
  gorunurYap?: boolean;
};

export const SehirAdi = ({
  tahminEdilecekSehir,
  tahminEdilenHarfler,
  gorunurYap = false,//oyun kaybedilirse bulunamayan harfleri göstermek için
}: SehirAdiProps) => {
  return (
    <div className="SehirAdiComponents">
      {tahminEdilecekSehir.split("").map((harf, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility:
                tahminEdilenHarfler.includes(harf) || gorunurYap
                  ? "visible"
                  : "hidden",
              color:
                !tahminEdilenHarfler.includes(harf) && gorunurYap ? "red" : "black",
            }}
          >
            {harf}
          </span>
        </span>
      ))}
    </div>
  );
};
