import React from "react";

interface InputFieldProps {
  label: string;
  tooltipUnit: string;
  value: number;
  onChange: (value: string) => void;
  placeholder: string;
  tooltip: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  tooltipUnit,
  value,
  onChange,
  placeholder,
  tooltip,
}) => {
  return (
    <div className="input-group group">
      <label className="input-label">
        {label}
        <span className="input-tooltip">({tooltipUnit})</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min="0"
      />
      <div className="tooltip-content">
        <p className="tooltip-text">{tooltip}</p>
      </div>
    </div>
  );
};
