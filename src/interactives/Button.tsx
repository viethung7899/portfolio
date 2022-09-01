import { useState } from "react";

function Button() {
  const [number, setNumber] = useState(0);

  return <button
    className="p-2 text-white bg-orange-500 hover:bg-orange-600 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-md"
    onClick={() => setNumber(number + 1)}>
      You click {number} {number === 1 ? "time" : "times"}
    </button>
};

export default Button;