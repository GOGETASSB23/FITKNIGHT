import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChoicePage.css';


const ChoicePage = () => {
  const navigate = useNavigate();

  return (
    <div className="choice-body">
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black bg-opacity-80 choice-page-bg">
      <div className="max-w-4xl w-full bg-black bg-opacity-80 p-8 rounded-lg border-2 border-yellow-500">
        <h1 className="text-4xl text-white text-center mb-12">Would You Prefer to have a Workout Buddy or a Fitness Group Organizer?</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <button 
            onClick={() => navigate('/workout-buddy-form')}
            className="p-6 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-bold text-xl transition-colors"
          >
            Workout Buddy
          </button>
          
          <button 
            onClick={() => navigate('/fitness-group-form')}
            className="p-6 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-bold text-xl transition-colors"
          >
            Fitness Group Organizer
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-white">
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-yellow-500">Workout Buddy</h3>
            <ul className="space-y-2">
              <li>• Find partners with similar fitness goals</li>
              <li>• Schedule workouts that match your availability</li>
              <li>• Share and track progress together</li>
              <li>• Get motivated with peer support</li>
            </ul>
          </div>

          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-yellow-500">Fitness Group Organizer</h3>
            <ul className="space-y-2">
              <li>• Create and manage fitness groups</li>
              <li>• Organize group activities and schedules</li>
              <li>• Build a community of fitness enthusiasts</li>
              <li>• Lead and inspire others</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChoicePage;