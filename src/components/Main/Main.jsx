import React, { useContext, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    recentData,
  } = useContext(Context);

  const resultContainerRef = useRef(null);

  const copyToClipboard = () => {
    const container = resultContainerRef.current;
    if (container) {
      const codeBlock = container.querySelector("pre code");
      const textToCopy = codeBlock
        ? codeBlock.innerText
        : container.innerText || container.textContent;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => alert("Copied to clipboard!"))
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

  console.log("input", input);

  return (
    <div className="main">
      <div className="nav">
        <p>Talk with Me</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you?</p>
            </div>
            <div className="cards">
              <div
                onClick={() =>
                  setInput("What are the historical places in Sri Lanka?")
                }
                className="card"
              >
                <p>What are the historical places in Sri Lanka?</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                onClick={() =>
                  setInput(
                    "What is the roadmap for front-end development with JavaScript?"
                  )
                }
                className="card"
              >
                <p>
                  What is the roadmap for front-end development with JavaScript?
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                onClick={() =>
                  setInput(
                    "What are the health tips to live long, in a healthy manner?"
                  )
                }
                className="card"
              >
                <p>
                  What are the health tips to live long, in a healthy manner?
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                onClick={() =>
                  setInput(
                    "Write a JavaScript code to get the largest number in an array."
                  )
                }
                className="card"
              >
                <p>
                  Write a JavaScript code to get the largest number in an array.
                </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result" ref={resultContainerRef}>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
              <button onClick={copyToClipboard}></button>
            </div>
            {console.log("back here:", recentData)}
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div>
                  {resultData.includes("```") ? (
                    <SyntaxHighlighter
                      language="javascript"
                      style={solarizedlight}
                    >
                      {resultData.replace(/```[\s\S]*?```/g, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter a prompt here"
              value={input}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Disclaimer: Gemini may display inaccurate info
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
