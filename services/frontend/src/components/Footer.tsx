import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { Canton, Regija, SpecialLocation } from "@javnikonkursi/shared";

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.linksContainer}>
        <Typography variant="subtitle2">Službe za zapošljavanje:</Typography>
        <a href="http://usk-szz.ba/nova/oglasi.php" target="blank">
          {Canton["Unsko-sanski kanton"]}
        </a>
        <a
          href="https://www.facebook.com/Slu%C5%BEba-za-zapo%C5%A1ljavanje-USK-a-507371329352460/"
          target="blank"
        >
          {Canton["Unsko-sanski kanton"]} | Facebook
        </a>
        <a href="http://www.szuzp.ba/nova-stranica-3.aspx" target="blank">
          {Canton["Posavski kanton"]}
        </a>
        <a href="https://szztk.ba/category/oglasi/" target="blank">
          {Canton["Tuzlanski kanton"]}
        </a>
        <a href="http://zdk-szz.ba/searchadvert" target="blank">
          {Canton["Zeničko-dobojski kanton"]}
        </a>
        <a href="https://szzbpk.ba/oglasikonkursi.html" target="blank">
          {Canton["Bosansko-podrinjski kanton"]}
        </a>
        <a href="http://szzksbsbk.com.ba/oglasi-za-posao/" target="blank">
          {Canton["Srednjobosanski kanton"]}
        </a>
        <a href="https://szzhnz-k.ba/natjecaji.php" target="blank">
          {Canton["Hercegovačko-neretvanski kanton"]}
        </a>
        <a href="http://szz-zzh.ba/category/oglasi/" target="blank">
          {Canton["Zapadnohercegovački kanton"]}
        </a>
        <a href="https://szks.ba/posao/" target="blank">
          {Canton["Kanton Sarajevo"]}
        </a>
        <a href="http://zzzu-livno.ba/oglasi/page/1" target="blank">
          {Canton["Kanton 10"]}
        </a>
        <a
          href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=1"
          target="blank"
        >
          {Regija["Banjalučka regija"]} | Banja Luka
        </a>
        <a
          href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=5"
          target="blank"
        >
          {Regija["Banjalučka regija"]} | Prijedor
        </a>
        <a
          href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=2"
          target="blank"
        >
          {Regija["Dobojsko-bijeljinska regija"]} | Bijeljina
        </a>
        <a
          href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=3"
          target="blank"
        >
          {Regija["Dobojsko-bijeljinska regija"]} | Doboj
        </a>
        <a
          href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=4"
          target="blank"
        >
          {Regija["Sarajevsko-zvornička regija"]} | Istočno Sarajevo
        </a>
        <a
          href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=7"
          target="blank"
        >
          {Regija["Sarajevsko-zvornička regija"]} | Zvornik
        </a>
        <a
          href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=6"
          target="blank"
        >
          {Regija["Trebinjsko-fočanska regija"]}
        </a>
        <a href="https://zzzbrcko.org/index.php/konkursi2016" target="blank">
          {SpecialLocation["Brčko distrikt"]}
        </a>
      </div>

      <div>
        <Typography variant="subtitle2">
          Kontakt: <Typography color="primary">h.joldic@enki.ba</Typography>
        </Typography>
      </div>
    </footer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: `${theme.spacing(3)}px 0`,
      display: "flex",
      justifyContent: "space-around",

      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",

        "& > div": {
          marginBottom: "5rem",
        },
      },
    },
    linksContainer: {
      display: "flex",
      flexDirection: "column",
      "& > a": {
        lineHeight: 2,
      },
    },
  })
);

export default Footer;
