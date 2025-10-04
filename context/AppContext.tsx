import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, Post, Reply, Notification, Animal } from '../types';
import { ANIMAL_CHOICES } from '../constants';

// Initial mock data
const initialPosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-2',
    author: ANIMAL_CHOICES[1],
    animalAdjective: '壓力大的',
    content: '最近工作壓力好大，覺得有點喘不過氣... 每天都好累。',
    tags: ['工作', '壓力'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'post-2',
    userId: 'user-3',
    author: ANIMAL_CHOICES[2],
    animalAdjective: '開心的',
    content: '今天天氣好好，心情也跟著變好了！希望大家都有美好的一天。',
    tags: ['心情', '日常'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const initialReplies: Reply[] = [
    {
        id: 'reply-1',
        postId: 'post-1',
        userId: 'user-3',
        author: ANIMAL_CHOICES[2],
        animalAdjective: '路過的',
        content: '拍拍你，辛苦了！記得要好好休息，給自己一點喘息的空間。',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    }
];


interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  posts: Post[];
  replies: Reply[];
  notifications: Notification[];
  login: (username: string, password: string) => { success: boolean; message?: string };
  register: (username: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'userId'>) => void;
  addReply: (reply: Omit<Reply, 'id' | 'createdAt' | 'userId'>) => void;
  getRepliesForPost: (postId: string) => Reply[];
  getPostById: (postId: string) => Post | undefined;
  markNotificationsAsRead: () => void;
  unreadNotificationCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('treehole-all-users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('treehole-posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });
  const [replies, setReplies] = useState<Reply[]>(() => {
    const savedReplies = localStorage.getItem('treehole-replies');
    return savedReplies ? JSON.parse(savedReplies) : initialReplies;
  });
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem('treehole-notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });
  
  useEffect(() => {
    const savedUser = localStorage.getItem('treehole-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('treehole-all-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('treehole-posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('treehole-replies', JSON.stringify(replies));
  }, [replies]);

  useEffect(() => {
    localStorage.setItem('treehole-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const register = (username: string, password: string): { success: boolean; message?: string } => {
    if (users.find(u => u.username === username)) {
      return { success: false, message: '此暱稱已被使用' };
    }
    const newUser: User = { id: `user-${Date.now()}`, username, password };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem('treehole-user', JSON.stringify(newUser));
    return { success: true };
  };

  const login = (username: string, password: string): { success: boolean; message?: string } => {
    const foundUser = users.find(u => u.username === username);
    if (!foundUser) {
      return { success: false, message: '找不到此用戶' };
    }
    if (foundUser.password !== password) {
      return { success: false, message: '密碼錯誤' };
    }
    setUser(foundUser);
    localStorage.setItem('treehole-user', JSON.stringify(foundUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('treehole-user');
  };

  const addPost = (postData: Omit<Post, 'id' | 'createdAt'| 'userId'>) => {
    if (!user) return;
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const addReply = (replyData: Omit<Reply, 'id' | 'createdAt'| 'userId'>) => {
    if (!user) return;
    const newReply: Reply = {
      ...replyData,
      id: `reply-${Date.now()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    setReplies(prev => [...prev, newReply]);

    // Create notification for the post author
    const post = posts.find(p => p.id === replyData.postId);
    if (post && post.userId !== user.id) {
        const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            userId: post.userId,
            postId: post.id,
            postContentSnippet: post.content.substring(0, 30) + '...',
            replyAuthor: replyData.author,
            replyAuthorAdjective: replyData.animalAdjective,
            replyContent: newReply.content,
            createdAt: new Date().toISOString(),
            read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
    }
  };
  
  const getRepliesForPost = useCallback((postId: string) => {
    return replies.filter(r => r.postId === postId).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [replies]);

  const getPostById = useCallback((postId: string) => {
    return posts.find(p => p.id === postId);
  }, [posts]);

  const markNotificationsAsRead = () => {
    if(!user) return;
    setNotifications(prev => prev.map(n => n.userId === user.id ? {...n, read: true} : n));
  };
  
  const unreadNotificationCount = notifications.filter(n => n.userId === user?.id && !n.read).length;

  const value = {
    user,
    isAuthenticated: !!user,
    posts,
    replies,
    notifications,
    login,
    register,
    logout,
    addPost,
    addReply,
    getRepliesForPost,
    getPostById,
    markNotificationsAsRead,
    unreadNotificationCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};