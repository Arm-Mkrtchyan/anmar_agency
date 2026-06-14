export interface ContactRequestPayload {
  interests: string[];
  email: string;
  phone: string;
  message?: string;
}

export interface ContactResponsePayload {
  success?: boolean;
  id?: string;
  error?: string;
}
