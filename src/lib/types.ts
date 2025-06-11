export interface Post {
  id: string;
  title: string;
  content: string;
  date: Date;
  imageURL?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  interest?: string;
  timestamp: Date;
  read?: boolean;
}

export interface User {
  email: string;
  uid: string;
}