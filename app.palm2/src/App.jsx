import './App.css';
import { useState } from 'react';

const ChatComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: chatHistory,
          message: inputValue,
        }),
      };
      const response = await fetch('https://gemini-nodejs-api.onrender.com/chat', options);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const responseData = await response.json();
      const generatedText = responseData.candidates[0].content.parts[0].text;
      
      // Append the new message to the chat history
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        { user: 'user', message: inputValue },
        { user: 'bot', message: generatedText },
      ]);
      
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSaveChat = () => {
    console.log('Saving chat:', chatHistory);
  };
  
  return (
    <>
    {response &&(
      <div className='ml-0 fixed top-20 left-0'>
        <button className="  py-2 px-4 border border-none w-[200px] h-[50px] bg-clip-text w-40" onClick={handleSaveChat}>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text sm:mb-4">Save Chat</span>
        </button>
      </div>
    )}
    
    <div className="chat-container mt-2 w-[800px] h-[500px] border border-solid mt-2 max-w-screen-lg mx-auto px-4">
     {!response &&(
      <h2 className="text-center text-4xl font-semibold mb-10  top-20 left-0 right-0 font-sans">How can I help you Today?</h2>
     )} 
      <div className="flex items-center justify-center mt-0 w-[800px] ">

        <div className="response-container mt-4">
          {chatHistory.map((chatItem, index) => (
            <div key={index} className=" p-4 rounded-md text-left font-sans" >
              <p className={`text-gray-800 mb-2 ${chatItem.user === 'user' ? 'font-bold' : ''}`}>{chatItem.user}: {chatItem.message}</p>
            </div>
          ))}
        </div>
        <br />
      </div>

      <div className="flex items-center justify-center mt-4">
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
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatComponent;
