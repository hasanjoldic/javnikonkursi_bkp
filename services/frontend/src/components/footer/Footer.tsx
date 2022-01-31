import React from "react";

import { Box, Paper, Typography, Theme, Divider, Link } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

import { ERegion } from "@javnikonkursi/shared";

import { darkTheme } from "theme";

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box position="relative" zIndex={darkTheme.zIndex.drawer}>
        <Paper square>
          <Divider />

          <footer className={classes.footer}>
            <div className={classes.linksContainer}>
              <Typography variant="subtitle2">Službe za zapošljavanje:</Typography>
              <Link href="http://usk-szz.ba/nova/oglasi.php" target="blank">
                <Typography variant="body1">{ERegion.USK}</Typography>
              </Link>
              <Link
                href="https://www.facebook.com/Slu%C5%BEba-za-zapo%C5%A1ljavanje-USK-a-507371329352460/"
                target="blank"
              >
                <Typography variant="body1">{ERegion.USK} | Facebook</Typography>
              </Link>
              <Link href="http://www.szuzp.ba/nova-stranica-3.aspx" target="blank">
                <Typography variant="body1">{ERegion.PK}</Typography>
              </Link>
              <Link href="https://szztk.ba/category/oglasi/" target="blank">
                <Typography variant="body1">{ERegion.TK}</Typography>
              </Link>
              <Link href="http://zdk-szz.ba/searchadvert" target="blank">
                <Typography variant="body1">{ERegion.ZDK}</Typography>
              </Link>
              <Link href="https://szzbpk.ba/oglasikonkursi.html" target="blank">
                <Typography variant="body1">{ERegion.BPK}</Typography>
              </Link>
              <Link href="http://szzksbsbk.com.ba/oglasi-za-posao/" target="blank">
                <Typography variant="body1">{ERegion.SBK}</Typography>
              </Link>
              <Link href="https://szzhnz-k.ba/natjecaji.php" target="blank">
                <Typography variant="body1">{ERegion.HNK}</Typography>
              </Link>
              <Link href="http://szz-zzh.ba/category/oglasi/" target="blank">
                <Typography variant="body1">{ERegion.ZHK}</Typography>
              </Link>
              <Link href="https://szks.ba/posao/" target="blank">
                <Typography variant="body1">{ERegion.KS}</Typography>
              </Link>
              <Link href="http://zzzu-livno.ba/oglasi/page/1" target="blank">
                <Typography variant="body1">{ERegion.K10}</Typography>
              </Link>
              <Link
                href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=1"
                target="blank"
              >
                <Typography variant="body1">{ERegion.BANJALUCKA_REGIJA} | Banja Luka</Typography>
              </Link>
              <Link
                href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=5"
                target="blank"
              >
                <Typography variant="body1">{ERegion.BANJALUCKA_REGIJA} | Prijedor</Typography>
              </Link>
              <Link
                href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=2"
                target="blank"
              >
                <Typography variant="body1">{ERegion.DOBOJSKO_BIJELJINJSKA_REGIJA} | Bijeljina</Typography>
              </Link>
              <Link
                href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=3"
                target="blank"
              >
                <Typography variant="body1">{ERegion.DOBOJSKO_BIJELJINJSKA_REGIJA} | Doboj</Typography>
              </Link>
              <Link
                href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=4"
                target="blank"
              >
                <Typography variant="body1">{ERegion.SARAJEVSKO_ZVORNICKA_REGIJA} | Istočno Sarajevo</Typography>
              </Link>
              <Link
                href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=7"
                target="blank"
              >
                <Typography variant="body1">{ERegion.SARAJEVSKO_ZVORNICKA_REGIJA} | Zvornik</Typography>
              </Link>
              <Link
                href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=6"
                target="blank"
              >
                <Typography variant="body1">{ERegion.TREBINJSKO_FOCANSKA_REGIJA}</Typography>
              </Link>
              <Link href="https://zzzbrcko.org/index.php/konkursi2016" target="blank">
                <Typography variant="body1">{ERegion.BRCKO_DISTRIKT}</Typography>
              </Link>
            </div>

            <div>
              <Typography variant="subtitle2">
                Kontakt: <Typography color="primary">h.joldic@enki.ba</Typography>
              </Typography>
            </div>
          </footer>
          <Box pb={2}>
            <Typography textAlign="center">
              Javni konkursi za zapošljavanje u javnim ustanovama i preduzećima u Bosni i Hercegovini
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(5),
      display: "flex",
      justifyContent: "space-around",

      [theme.breakpoints.down("md")]: {
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
