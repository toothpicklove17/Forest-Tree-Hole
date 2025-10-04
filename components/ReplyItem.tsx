import React from 'react';
import { Reply } from '../types';

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply }) => {
  return (
    <div className="pt-4">
      <div className="flex-1">
        <div className="bg-forest-bg p-3 rounded-lg">
          <p className="font-bold text-forest-accent text-sm mb-1">{reply.animalAdjective}{reply.author.name}</p>
          <p className="text-sm text-forest-text">{reply.content}</p>
        </div>
        <p className="text-xs text-gray-400 mt-1">{new Date(reply.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ReplyItem;