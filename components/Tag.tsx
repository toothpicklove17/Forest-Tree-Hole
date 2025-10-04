
import React from 'react';
import { Link } from 'react-router-dom';

interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <Link
      to={`/tag/${tag}`}
      className="bg-forest-tag text-forest-text text-xs font-medium mr-2 px-2.5 py-1 rounded-full hover:bg-forest-accent hover:text-white transition"
    >
      #{tag}
    </Link>
  );
};

export default Tag;
