export enum Canton {
  "Unsko-sanski kanton" = "Unsko-sanski kanton",
  "Posavski kanton" = "Posavski kanton",
  "Tuzlanski kanton" = "Tuzlanski kanton",
  "Zenicko-dobojski kanton" = "Zenicko-dobojski kanton",
  "Bosansko-podrinjski kanton" = "Bosansko-podrinjski kanton",
  "Srednjobosanski kanton" = "Srednjobosanski kanton",
  "Hercegovacko-neretvanski kanton" = "Hercegovacko-neretvanski kanton",
  "Zapadnohercegovacki kanton" = "Zapadnohercegovacki kanton",
  "Kanton Sarajevo" = "Kanton Sarajevo",
  "Kanton 10" = "Kanton 10",
}

export enum Regija {
  "Banjalucka regija" = "Banjalucka regija",
  "Dobojsko-bijeljinska regija" = "Dobojsko-bijeljinska regija",
  "Sarajevsko-zvornicka regija" = "Sarajevsko-zvornicka regija",
  "Trebinjsko-focanska regija" = "Trebinjsko-focanska regija",
}

export enum SpecialLocation {
  "Brcko distrikt" = "Brcko distrikt",
}

export type Location = Canton | Regija | SpecialLocation;

export const locations: Location[] = [
  ...Object.values(Canton),
  ...Object.values(Regija),
  ...Object.values(SpecialLocation),
];
