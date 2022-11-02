import React from "react";

const Error = ({mensaje}) => {
  return (
    <h2 className="bg-red-800 text-white p-5 mb-5 ease text-center font-bold rounded">
      {mensaje}
    </h2>
  );
};

export default Error;
