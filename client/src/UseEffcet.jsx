import React, { useState, useEffect } from "react";

function UseEffect() {
  const [count, setCount] = useState(0);
  const [val, setVal] = useState(10);
  useEffect(() => {
    console.log("useEffect called! Count is:", count);
    console.log("value print", val);
  }, []);
  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </>
  );
}

export default UseEffect;
