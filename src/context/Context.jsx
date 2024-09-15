import { createContext } from "react";
import runChat from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Reset chat state
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Typing effect showing one character at a time
  const typeWithDelay = (formattedText) => {
    let displayedText = "";
    formattedText.split("").forEach((char, index) => {
      setTimeout(() => {
        displayedText += char;
        setResultData(displayedText); // Update resultData to simulate typing
      }, 5 * index); // Adjust delay per character
    });
  };

  // Handle response and format with typewriter effect
  const onSent = async (prompt) => {
    setResultData(""); // Clear previous result
    setLoading(true); // Show loading
    setShowResult(true); // Toggle result display

    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    // Convert markdown-like formatting to HTML
    let formattedResponse = response
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>") // Code blocks
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold text
      .replace(/\*/g, "<br>"); // New line

    // Apply typing effect with delay
    typeWithDelay(formattedResponse);

    setLoading(false); // Hide loading
    setInput(""); // Clear input after sending
  };

  const contextValue = {
    resultData,
    setResultData,
    loading,
    setLoading,
    showResult,
    setShowResult,
    previousPrompts,
    setPreviousPrompts,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
