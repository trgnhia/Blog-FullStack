export interface BlogRequest {
  title : string,
  author : string,
  slug : string,
  coverImagePath : string,
  tags : string,
  excerpt : string,
  content : string,
  // coverImageId: string
  publish : boolean
}

export interface BlogResponse {
  id : string,
  createdAt : string,
  title : string,
  author : string,
  slug : string,
  coverImagePath : string,
  coverImageUrl: string;
  tags : string,
  excerpt : string,
  content : string,
  publish : boolean
}


export interface BlogViewModel extends BlogResponse {
  tagsArray: string[];
  created: string;
}

export interface BlogUpdateRequest extends BlogRequest {
  id : string;
}
