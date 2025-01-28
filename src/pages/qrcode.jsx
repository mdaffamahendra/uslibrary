import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const canvasRef = useRef(null);

  const downloadQRCode = () => {
    const canvas = canvasRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text to generate QR code"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
      />
      <div
        ref={canvasRef}
        className="bg-white p-4 rounded shadow-lg"
      >
        {text ? (
          <QRCodeCanvas value={text} size={200} />
        ) : (
          <p className="text-gray-500">Enter text to see QR Code</p>
        )}
      </div>
      {text && (
        <button
          onClick={downloadQRCode}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
