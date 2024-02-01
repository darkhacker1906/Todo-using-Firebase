import React from "react";

function Button({ title,handleClick }) {
  return (
    <div>
      <button className="bg-slate-300 hover:bg-slate-400" type="submit" onClick={handleClick}>
        {title}
      </button>
    </div>
  );
}

export default Button;