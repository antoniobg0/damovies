import Navbar from '@/components/Navbar';
import Movies from '@/pages/movies';
import { useEffect, useState } from 'react';

const App = () => {
  // Very basic auth method
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_API_TOKEN && import.meta.env.VITE_API_URL) {
      setIsAuth(true);
    }
  }, []);

  if (!isAuth) {
    return (
      <div className="flex h-svh justify-center items-center">
        <div className="p-4 w-1/3 h-1/3 bg-gray-400 rounded-md flex items-center justify-center">
          <h4 className=" font-semibold text-xl">Please configure env variables in order to proceed</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="h-svh">
      <Navbar />
      <div className="bg-slate-300 h-auto">
        <Movies />
      </div>
    </div>
  );
};

export default App;
