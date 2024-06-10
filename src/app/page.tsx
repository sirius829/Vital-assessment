import React from 'react';
import DraggableList from "@/components/DraggableList";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow-md w-full max-w-lg pt-4">
        <h1 className="font-bold mb-4 text-2xl text-slate-900 text-center">Draggable List</h1>
        <DraggableList />
      </div>
    </div>
  );
}
