export interface Player {
  name: string;
  nameOriginal: string;
  country: string;
  era: string;
  position: string;
  clubs: string;
  goals: string;
  trophies: string;
  style: string;
  fact: string;
  active: boolean;
  rating: string;
}

export interface Actor {
  name: string;
  birth: string;
  status: "نشط" | "راحل";
  knownFor: string;
  movies: string;
  tvShows: string;
  fact: string;
  rating: string;
}

export type ScreenMode = "landing" | "football" | "actors";
export type FilterMode = "any" | "active" | "retired";
