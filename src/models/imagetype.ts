export interface ImageType {
  description: string;
  user: {
    username: string;
  };
  urls: {
    raw: string;
  };
  width: number;
  height: number;
}

export interface SearchResponse {
  results: ImageType[];
}
