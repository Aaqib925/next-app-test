import React from 'react';

import Appbuttons from '@/components/buttons/Appbuttons';


const Slide: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 flex flex-col h-screen w-64 bg-gray-800 text-white shadow-md">
      {/* Profile Section */}
      <div className="flex items-center justify-center h-20 bg-gray-700">
        <img className="w-20 h-20 bg-white rounded" src="" alt="Large avatar">
        </img></div>
      <div className="flex-1 overflow-y-auto">
        {/* Your list items go here */}
        <ul className="p-4">
          <li className="text-gray-200">List item 1</li>
          <li className="text-gray-200">List item 2</li>
          <li className="text-gray-200">List item 3</li>
          {/* Add more list items as needed */}
        </ul>
      </div>

      {/* Bottom Button */}
      <Appbuttons title='logout' />
    </div>
  );
};

export default React.memo(Slide);