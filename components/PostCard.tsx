import React, { useState } from 'react';
import { Post, Animal } from '../types';
import { useAppContext } from '../context/AppContext';
import ReplyItem from './ReplyItem';
import Tag from './Tag';
import AnimalSelector from './AnimalSelector';
import { ANIMAL_CHOICES } from '../constants';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { getRepliesForPost, addReply } = useAppContext();
  const [replyContent, setReplyContent] = useState('');
  const [replyAdjective, setReplyAdjective] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(ANIMAL_CHOICES[0]);

  const replies = getRepliesForPost(post.id);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    addReply({
      postId: post.id,
      author: selectedAnimal,
      animalAdjective: replyAdjective.trim(),
      content: replyContent,
    });

    setReplyContent('');
    setReplyAdjective('');
  };

  return (
    <div className="bg-forest-card p-6 rounded-xl shadow-lg mb-6 break-words">
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-bold text-forest-accent">{post.animalAdjective}{post.author.name}</p>
            <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
          <p className="mt-2 text-forest-text whitespace-pre-wrap">{post.content}</p>
          <div className="mt-4">
            {post.tags.map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        {replies.map((reply) => (
          <ReplyItem key={reply.id} reply={reply} />
        ))}
      </div>

      {replies.length > 0 && <div className="mt-4 pt-4 border-t border-forest-border"></div>}

      <div className={`${replies.length === 0 ? 'mt-4 pt-4 border-t border-forest-border' : ''}`}>
        <form onSubmit={handleReplySubmit} className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <AnimalSelector selectedAnimal={selectedAnimal} onSelectAnimal={setSelectedAnimal} />
              </div>
              <div>
                  <label className="block text-sm font-medium text-forest-text mb-2">幫他加個形容詞</label>
                  <input
                      type="text"
                      value={replyAdjective}
                      onChange={(e) => setReplyAdjective(e.target.value)}
                      placeholder="例如：路過的"
                      className="w-full p-2.5 bg-forest-bg border border-forest-border rounded-lg text-forest-text focus:ring-2 focus:ring-forest-accent focus:outline-none transition"
                  />
              </div>
          </div>
          <div className="flex items-start">
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={`以 ${replyAdjective.trim()}${selectedAnimal.name} 的身份回應...`}
                className="w-full p-2 bg-forest-bg border border-forest-border rounded-lg text-forest-text focus:ring-2 focus:ring-forest-accent focus:outline-none transition"
                rows={2}
                required
              />
               <button
                type="submit"
                className="mt-2 bg-forest-accent text-white font-bold px-4 py-1 rounded-lg hover:bg-forest-hover transition text-sm disabled:opacity-50"
                disabled={!replyContent.trim()}
              >
                回應
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCard;