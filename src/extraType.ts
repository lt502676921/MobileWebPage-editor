export interface UploadResponse {
  code: number;
  message: string;
  data: {
    url: string;
  };
}
