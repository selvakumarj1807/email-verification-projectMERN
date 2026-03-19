import React, { useState } from "react";
import axios from "axios";

function App() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {

    if (!email) {
      setMessage("Please enter email ❌");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/send-email",
        { email }
      );

      setMessage(res.data.message);

    } catch (error) {
      setMessage("Server error ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Email Verification + Welcome Mail</h2>

      <input
        type="email"
        placeholder="Enter Gmail"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={sendEmail}>
        Send Welcome Email
      </button>

      <p>{message}</p>

    </div>
  );
}

export default App;