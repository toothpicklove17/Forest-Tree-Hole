
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { getPostById } = useAppContext();
  
  const post = postId ? getPostById(postId) : undefined;

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/" className="text-forest-accent hover:text-forest-hover transition">
          &larr; 返回時間軸
        </Link>
      </div>
      {post ? (
        <PostCard post={post} />
      ) : (
        <div className="text-center py-10 bg-forest-card rounded-lg">
          <h2 className="text-2xl font-bold text-forest-accent mb-4">找不到貼文</h2>
          <p className="text-forest-text">這則貼文可能已經被森林裡的小動物藏起來了。</p>
        </div>
      )}
    </Layout>
  );
};

export default PostPage;
