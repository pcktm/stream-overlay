import {useState} from 'react';
import BottomBar from './components/BottomBar';

function App() {
  return (
    <div className="relative min-h-screen min-w-full select-none">
      <div className="absolute bottom-0 left-0 flex w-full">
        <BottomBar />
      </div>

    </div>
  );
}

export default App;
