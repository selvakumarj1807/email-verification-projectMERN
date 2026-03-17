import React, { useState } from "react";
import axios from "axios";

function App() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {

    const response = await axios.post(
      "http://localhost:5000/send-otp",
      { email }
    );

    setMessage(response.data.message);

  };

  const verifyOtp = async () => {

    const response = await axios.post(
      "http://localhost:5000/verify-otp",
      { email, otp }
    );

    setMessage(response.data.message);

  };

  return (

    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Email OTP Verification</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={sendOtp}>
        Send OTP
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={verifyOtp}>
        Verify OTP
      </button>

      <p>{message}</p>

    </div>

  );

}

export default App;
