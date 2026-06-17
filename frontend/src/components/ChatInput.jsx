import { useState } from "react";

export default function ChatInput({ sendMessage }) {

  const [input, setInput] = useState("");

  const handleSend = () => {

  if (!input.trim())
    return;

  sendMessage(input);

  setInput("");

};

  return (
    <div className="prompt-wrapper">

      <div className="prompt-box">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message DevPilot..."

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSend();

            }

          }}
        />

        <button onClick={handleSend}>→</button>

      </div>

    </div>
  );
}