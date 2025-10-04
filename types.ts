export interface Animal {
  name: string;
}

export interface User {
  id: string;
  username: string;
  password?: string;
}

export interface Reply {
  id: string;
  postId: string;
  author: Animal;
  animalAdjective?: string;
  userId: string; // ID of the user who replied
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: Animal;
  animalAdjective?: string;
  userId: string; // The real user ID
  content: string;
  tags: string[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string; // User to notify
  postId: string;
  postContentSnippet: string;
  replyAuthor: Animal;
  replyAuthorAdjective?: string;
  replyContent: string;
  createdAt: string;
  read: boolean;
}