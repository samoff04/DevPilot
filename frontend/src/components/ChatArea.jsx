import ChatInput from "./ChatInput";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { oneDark }
from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatArea({
  messages,
  sendMessage
}) {

  return (

    <div className="chat-area">

      {messages.length === 0 ? (

        <div className="empty-state">

          <h1>What can I help with?</h1>

          <p>
            Ask coding questions,
            generate code,
            debug errors
          </p>

        </div>

      ) : (

        <div className="messages">

          <div className="message-container">

            {messages.map((msg, i) => (

              <div
                key={i}
                className="message-block"
              >

                <div className="message-role">

                  {
                    msg.role === "user"
                    ? "You"
                    : "DevPilot"
                  }

                </div>

                <div
                  className={
                    msg.role === "user"
                    ? "user-content"
                    : "assistant-content"
                  }
                >

                  <ReactMarkdown

                    components={{

                      code({
                        inline,
                        className,
                        children,
                        ...props
                      }) {

                        const match =
                          /language-(\w+)/.exec(
                            className || ""
                          );

                        return !inline && match ? (

                          <SyntaxHighlighter

                            style={oneDark}

                            language={match[1]}

                            PreTag="div"

                            {...props}

                          >

                            {
                              String(children)
                                .replace(/\n$/, "")
                            }

                          </SyntaxHighlighter>

                        ) : (

                          <code
                            className={className}
                            {...props}
                          >

                            {children}

                          </code>

                        );

                      }

                    }}

                  >

                    {msg.content}

                  </ReactMarkdown>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      <ChatInput sendMessage={sendMessage} />

    </div>

  );

}