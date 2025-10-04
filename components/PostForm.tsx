import React, { useState } from 'react';
import { Animal } from '../types';
import { useAppContext } from '../context/AppContext';
import AnimalSelector from './AnimalSelector';
import { ANIMAL_CHOICES } from '../constants';

const PostForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [adjective, setAdjective] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(ANIMAL_CHOICES[0]);
  const { addPost } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const tagsArray = tags.split(/[,，\s]+/).filter(Boolean);
    addPost({
      author: selectedAnimal,
      animalAdjective: adjective.trim(),
      content,
      tags: tagsArray,
    });

    setContent('');
    setTags('');
    setAdjective('');
  };

  return (
    <div className="bg-forest-card p-6 rounded-xl shadow-lg mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <AnimalSelector selectedAnimal={selectedAnimal} onSelectAnimal={setSelectedAnimal} />
          </div>
          <div>
            <label className="block text-sm font-medium text-forest-text mb-2">幫他加個形容詞</label>
            <input
              type="text"
              value={adjective}
              onChange={(e) => setAdjective(e.target.value)}
              placeholder="例如：快樂的"
              className="w-full p-2.5 bg-forest-bg border border-forest-border rounded-lg text-forest-text focus:ring-2 focus:ring-forest-accent focus:outline-none transition"
            />
          </div>
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`你好, ${adjective.trim()}${selectedAnimal.name}，有什麼想說的嗎？`}
            className="w-full h-32 p-3 bg-forest-bg border border-forest-border rounded-lg text-forest-text focus:ring-2 focus:ring-forest-accent focus:outline-none transition"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="加上一些標籤吧 (用逗號分隔)"
            className="w-full p-3 bg-forest-bg border border-forest-border rounded-lg text-forest-text focus:ring-2 focus:ring-forest-accent focus:outline-none transition"
          />
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="bg-forest-accent text-white font-bold px-6 py-2 rounded-lg hover:bg-forest-hover transition disabled:opacity-50"
            disabled={!content.trim()}
          >
            送出
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;