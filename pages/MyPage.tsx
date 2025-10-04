
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';

const MyPage: React.FC = () => {
  const { user, posts } = useAppContext();

  const myPosts = posts
    .filter(p => p.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-forest-accent font-display mb-6">我的貼文</h1>
      
      <div>
        {myPosts.length > 0 ? (
          myPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center py-10 bg-forest-card rounded-lg">你還沒有發過任何貼文。</p>
        )}
      </div>
    </Layout>
  );
};

export default MyPage;
