import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('請輸入暱稱和密碼');
      return;
    }

    let result;
    if (isRegister) {
      result = register(username.trim(), password.trim());
    } else {
      result = login(username.trim(), password.trim());
    }

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || '發生未知錯誤');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-forest-card rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-forest-accent font-display">
            {isRegister ? '註冊新帳號' : '歡迎回到森林樹洞'}
          </h2>
          <p className="mt-2 text-center text-sm text-forest-text">
            {isRegister ? '創造一個身份，開始分享你的秘密' : '請輸入帳號密碼登入'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                暱稱
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-forest-border bg-forest-bg placeholder-gray-500 text-forest-text focus:outline-none focus:ring-forest-accent focus:border-forest-accent focus:z-10 sm:text-sm"
                placeholder="你的暱稱"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-forest-border bg-forest-bg placeholder-gray-500 text-forest-text focus:outline-none focus:ring-forest-accent focus:border-forest-accent focus:z-10 sm:text-sm"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-forest-accent hover:bg-forest-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-accent"
            >
              {isRegister ? '註冊並進入樹洞' : '登入'}
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="font-medium text-sm text-forest-accent hover:text-forest-hover"
            >
              {isRegister ? '已經有帳號了？ 前往登入' : '還沒有帳號？ 前往註冊'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;