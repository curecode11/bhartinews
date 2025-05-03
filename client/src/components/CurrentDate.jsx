import React from "react";

const CurrentDate = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long", // e.g., Monday
    year: "numeric",
    month: "long", // e.g., April
    day: "numeric",
  });

  return (
    <div style={{ color: "maroon", fontWeight: "bold", padding: "10px" }}>
      {formattedDate}
    </div>
  );
};

export default CurrentDate;
