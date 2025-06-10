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
  message: string;
  timestamp: Date;
}

export interface User {
  email: string;
  uid: string;
}