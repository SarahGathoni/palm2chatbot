import './App.css';
import  { useState } from 'react';

const ChatComponent = () => {
  const [inputValue, setInputValue] = useState('');
  
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted:', inputValue);
    // For demonstration purposes, just echoing the input as a response
    setResponse(inputValue);
    setInputValue(''); // Clear input after submission
  };

  return (
    <div className="chat-container mt-2 w-[800px] h-[500px] border border-solid">
      <h2 className='text-center text-4xl font-semibold mb-10  top-20 left-0 right-0'>How can I help you Today?</h2>
      <div className="flex items-center justify-center mt-0 w-[800px] ">

      <div className="response-container mt-4">
        {response && (
          <div className="bg-gray-100 p-4 rounded-md" style={{ width: 'calc(100% - 60px)' }}>
            <p className="text-gray-800">{response}</p>
            
          </div>
          
        )}
      </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="py-2 px-4 rounded-l-md outline-none border border-gray-300 shadow-inset  transition-all duration-300 ease-in-out mr-2 w-[700px] sm:w-96"
          
          
        />
        <button
          onClick={handleSubmit}
          className="py-2 px-4 rounded-r-md bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
      
    </div>
  );
};

export default ChatComponent;
