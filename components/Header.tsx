
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import NotificationItem from './NotificationItem';

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const Header: React.FC = () => {
  const { isAuthenticated, logout, user, unreadNotificationCount, notifications, markNotificationsAsRead } = useAppContext();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const myNotifications = notifications
    .filter(n => n.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const toggleNotifications = () => {
    if (!isNotificationsOpen && unreadNotificationCount > 0) {
      markNotificationsAsRead();
    }
    setIsNotificationsOpen(prev => !prev);
  };

  const handleNotificationClick = (postId: string) => {
    navigate(`/post/${postId}`);
    setIsNotificationsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-forest-card shadow-lg sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-display text-forest-accent hover:text-forest-hover transition">
              <LeafIcon />
              森林樹洞
            </Link>
          </div>
          <nav className="hidden md:block">
            {isAuthenticated && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-forest-text hover:bg-forest-tag hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">時間軸</Link>
                <Link to="/my-page" className="text-forest-text hover:bg-forest-tag hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">我的頁面</Link>
              </div>
            )}
          </nav>
          <div className="flex items-center">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={toggleNotifications}
                    className="text-forest-text hover:bg-forest-tag p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-forest-card focus:ring-white transition"
                    aria-label="Notifications"
                  >
                    <BellIcon />
                    {unreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-forest-card border border-forest-border rounded-lg shadow-xl z-30">
                      <div className="p-3 border-b border-forest-border">
                        <h3 className="font-bold text-forest-text">通知中心</h3>
                      </div>
                      <div className="divide-y divide-forest-border">
                        {myNotifications.length > 0 ? (
                          myNotifications.map(notification => (
                            <NotificationItem 
                              key={notification.id} 
                              notification={notification} 
                              onClick={() => handleNotificationClick(notification.postId)} 
                            />
                          ))
                        ) : (
                          <p className="p-4 text-center text-sm text-gray-400">目前沒有任何通知。</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-forest-text hidden sm:block">你好, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-forest-accent text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-forest-hover transition"
                >
                  登出
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-forest-accent text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-forest-hover transition"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
