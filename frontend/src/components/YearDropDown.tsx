import React from "react";
import { Select } from "antd";

const { Option } = Select;

const YearDropdown: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <Select defaultValue={currentYear} style={{ width: 120 }}>
      {years.map((year) => (
        <Option key={year} value={year}>
          {year}
        </Option>
      ))}
    </Select>
  );
};

export default YearDropdown;
