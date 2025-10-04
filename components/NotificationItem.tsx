import React from 'react';
import { Notification } from '../types';
import { useNavigate } from 'react-router-dom';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  
  return (
    <div
      onClick={onClick}
      className={`p-4 border-l-4 ${
        notification.read ? 'border-transparent' : 'border-forest-accent'
      } bg-forest-card/50 hover:bg-forest-card transition cursor-pointer rounded-r-lg`}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <p className="text-sm text-forest-text">
            <span className="font-bold text-forest-accent">{notification.replyAuthorAdjective}{notification.replyAuthor.name}</span> 回應了你的貼文:
            <span className="italic text-gray-400 ml-1">「{notification.postContentSnippet}」</span>
          </p>
          <div className="mt-1 p-2 bg-forest-bg rounded-md">
            <p className="text-sm text-forest-text">{notification.replyContent}</p>
          </div>
          <p className="text-xs text-gray-400 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;