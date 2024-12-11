'use client';
import { useState } from 'react';

const Playground = () => {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'User', message: 'Compare the weather in London and Sydney hemisphere city' },
    {
      sender: 'Bot',
      message: `London and Sydney have distinct weather conditions. Currently, London is experiencing overcast clouds with a   toolless_agent.py:48
                    temperature of 6.53°C, while Sydney enjoys a clear sky and a warmer temperature of 20.1°C.                                                      
                                                                                                                                                                    
                    Similarities:                                                                                                                               
                    - Both cities can experience variable weather conditions.                                                                                       
                                                                                                                                                                    
                    Differences:                                                                                                                                
                    - London is cooler and overcast, whereas Sydney is warmer and clear.  `,
    },
  ]);
  const [input, setInput] = useState('');

  const [terminalOutput, setTerminalOutput] =
    useState(`[13:12:16] INFO     Plan generated:                                                                                                                base_runner.py:42
                    0: Get the weather in London. | tool: portia::weather_tool | output: $london_weather | input: None                                              
                    1: Get the weather in Sydney. | tool: portia::weather_tool | output: $sydney_weather | input: None                                              
                    2: Compare the weather of London and Sydney and summarize the similarities and differences. | tool: None | output:                              
                    $weather_comparison | input: ['$london_weather', '$sydney_weather']                                                                             
           INFO     Plan execution started with 3 steps                                                                                            base_runner.py:49
           INFO     Executing step 0: Get the weather in London.                                                                                 plan_executor.py:61
[13:12:18] INFO     Invoking: Weather_Tool with {'city': 'London'}                                                                    complex_langgraph_agent.py:289
           INFO     Tool Weather Tool executed in 0.07 seconds                                                                               portia_base_tool.py:114
           INFO     Tool Output: The current weather in London is overcast clouds with a temperature of 6.53°C.                       complex_langgraph_agent.py:428
           INFO     Executing step 1: Get the weather in Sydney.                                                                                 plan_executor.py:61
[13:12:21] INFO     Invoking: Weather_Tool with {'city': 'Sydney'}                                                                    complex_langgraph_agent.py:289
           INFO     Tool Weather Tool executed in 0.05 seconds                                                                               portia_base_tool.py:114
           INFO     Tool Output: The current weather in Sydney is clear sky with a temperature of 20.1°C.                             complex_langgraph_agent.py:428
           INFO     Executing step 2: Compare the weather of London and Sydney and summarize the similarities and differences.                   plan_executor.py:61
[13:12:22] INFO     Calling LLM: London and Sydney have distinct weather conditions. Currently, London is experiencing overcast clouds with a   toolless_agent.py:48
                    temperature of 6.53°C, while Sydney enjoys a clear sky and a warmer temperature of 20.1°C.                                                      
                                                                                                                                                                    
                    Similarities:                                                                                                                               
                    - Both cities can experience variable weather conditions.                                                                                       
                                                                                                                                                                    
                    Differences:                                                                                                                                
                    - London is cooler and overcast, whereas Sydney is warmer and clear.  `);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setChatMessages([...chatMessages, { sender: 'User', message: input }]);
      setInput('');
      // Here, you can simulate a response or use an API call for chat responses
      setChatMessages((prevMessages) => [...prevMessages, { sender: 'Bot', message: 'This is a response.' }]);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Chat Interface */}
      <div className="flex-1 bg-white border border-gray-300 rounded-lg p-4 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Chat</h2>
        <div className="h-[400px] overflow-y-auto mb-4 break-words">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`mb-2  ${msg.sender !== 'User' ? 'text-right' : ''}`}>
              <strong>{msg.sender}: </strong>
              {msg.message}
            </div>
          ))}
        </div>
        <form onSubmit={handleChatSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg"
            placeholder="Type a message..."
          />
          <button type="submit" className="p-2 bg-blue-600 text-white rounded-r-lg">
            Send
          </button>
        </form>
      </div>

      {/* Terminal Interface */}
      <div className="flex-1 bg-black text-white border border-gray-300 rounded-lg p-4 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Terminal</h2>
        <div className="h-[400px] overflow-y-auto mb-4 break-words">
          <pre>{terminalOutput}</pre>
        </div>
      </div>
    </div>
  );
};

export default Playground;
