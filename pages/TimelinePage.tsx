
import React from 'react';
import { useAppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import Layout from '../components/Layout';

const TimelinePage: React.FC = () => {
  const { posts } = useAppContext();
  
  const sortedPosts = [...posts].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-forest-accent font-display mb-6">時間軸</h1>
      <PostForm />
      <div>
        {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-10 bg-forest-card rounded-lg">
            <p className="text-forest-text">樹洞裡還沒有秘密，快來分享你的吧！</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TimelinePage;
