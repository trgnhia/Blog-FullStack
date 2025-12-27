export interface ImageResponse {
  fileName: string;
  url: string,
  path: string 
}

export interface ImagePageResponse {
  items : ImageResponse[];
  hasNext: boolean;
}