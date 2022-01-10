export enum ECanton {
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

export enum ERegija {
  "Banjalucka regija" = "Banjalucka regija",
  "Dobojsko-bijeljinska regija" = "Dobojsko-bijeljinska regija",
  "Sarajevsko-zvornicka regija" = "Sarajevsko-zvornicka regija",
  "Trebinjsko-focanska regija" = "Trebinjsko-focanska regija",
}

export enum ESpecialLocation {
  "Brcko distrikt" = "Brcko distrikt",
}

export type TLocation = ECanton | ERegija | ESpecialLocation;

export const locations = [
  ...Object.values(ECanton),
  ...Object.values(ERegija),
  ...Object.values(ESpecialLocation),
];
