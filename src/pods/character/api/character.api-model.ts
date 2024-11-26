export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;

  url: string;
  created: string;
}

export interface Origin {
  name: string;
}

export interface Location {
  name: string;
}
