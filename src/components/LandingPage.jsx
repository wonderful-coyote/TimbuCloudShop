import React, {useEffect} from 'react';
import Header from './Header';
import Main from './Main';

const ScrollToTopOnMount = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

function App() {
  return (
    
    <ScrollToTopOnMount>
      <div className="font-space bg-gray-50 min-h-screen">
        <Header />
        <Main />

      </div>
    </ScrollToTopOnMount>
  );
}

export default App;
