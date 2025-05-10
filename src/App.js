import React, { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

function App() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: 'New Element',
      style: {
        width: '200px',
        height: '100px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '0.375rem',
        padding: '1rem',
      }
    };
    setElements([...elements, newElement]);
  };

  const updateElement = (id, updates) => {
    setElements(elements.map(element => 
      element.id === id ? { ...element, ...updates } : element
    ));
  };

  const deleteElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Web Design App</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          {/* Toolbar */}
          <div className="w-64 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Elements</h2>
            <div className="space-y-2">
              <button
                onClick={() => addElement('text')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Text
              </button>
              <button
                onClick={() => addElement('image')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Image
              </button>
              <button
                onClick={() => addElement('button')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Button
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow min-h-[600px]">
            <div className="relative w-full h-full">
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move ${selectedElement?.id === element.id ? 'ring-2 ring-primary' : ''}`}
                  style={element.style}
                  onClick={() => setSelectedElement(element)}
                >
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Implement edit functionality
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <PencilIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteElement(element.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <TrashIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  {element.content}
                </div>
              ))}
            </div>
          </div>

          {/* Properties Panel */}
          {selectedElement && (
            <div className="w-64 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Properties</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <input
                    type="text"
                    value={selectedElement.content}
                    onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Width</label>
                  <input
                    type="text"
                    value={selectedElement.style.width}
                    onChange={(e) => updateElement(selectedElement.id, {
                      style: { ...selectedElement.style, width: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Height</label>
                  <input
                    type="text"
                    value={selectedElement.style.height}
                    onChange={(e) => updateElement(selectedElement.id, {
                      style: { ...selectedElement.style, height: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App; 