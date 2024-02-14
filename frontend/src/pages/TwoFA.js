import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sendAuthCode = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = localStorage.getItem("access");
    console.log("i was here");
    response = await axios.post(
      `${redirectUri}/api/sendQrCode`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

const verifyAuthCode = async ({ redirectUri, otp_code_input }) => {
  let response = {};
  try {
    const token = localStorage.getItem("access");
    response = await axios.post(
      `${redirectUri}/api/TwoFactorAuth`,
      { otp_code: otp_code_input },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

function TwoFA({ redirectUri }) {
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();
  const hasSentCodeRef = useRef(false);

  useEffect(() => {
    if (!hasSentCodeRef.current) {
      sendAuthCode({ redirectUri });
      hasSentCodeRef.current = true;
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await verifyAuthCode({
      redirectUri,
      otp_code_input: otpCode,
    });

    if (response.status === 200) {
      navigate("/home");
    } else {
      alert("Invalid authentication code");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="mb-4 text-xl font-bold text-white text-center 
		bg-black bg-opacity-50 p-2 rounded"
      >
        The authentication code has been sent to your email
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none
				focus:border-blue-500 text-center"
          placeholder="Authentication code"
          value={otpCode}
          onChange={(event) => setOtpCode(event.target.value)}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default TwoFA;
