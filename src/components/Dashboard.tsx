// src/components/MainPage.tsx
import React, { useState } from "react";
import { Button } from "antd";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("tracker");

  const renderPage = () => {
    if (currentPage === "tracker") {
      return <div>Tracker Content</div>;
    } else {
      return <div>Data Entry Content</div>;
    }
  };

  return (
    <div>
      <Button onClick={() => setCurrentPage("tracker")}>Tracker</Button>
      <Button onClick={() => setCurrentPage("dataEntry")}>Data Entry</Button>
      {renderPage()}
    </div>
  );
};

export default Dashboard;
