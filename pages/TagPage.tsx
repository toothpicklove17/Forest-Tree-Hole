
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';
import Layout from '../components/Layout';

const TagPage: React.FC = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const { posts } = useAppContext();

  const filteredPosts = posts
    .filter(post => post.tags.includes(tagName || ''))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-forest-accent font-display mb-6">
        標籤: <span className="text-forest-hover">#{tagName}</span>
      </h1>
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-10 bg-forest-card rounded-lg">
            <p className="text-forest-text">這個標籤下還沒有任何貼文。</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TagPage;
