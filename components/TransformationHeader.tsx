import React from "react";

const TransformationHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className={`${subtitle && "px-5"}`}>
      <h2 className="h2-bold text-dark-600">{title}</h2>
      {subtitle && (
        <p className="p-16-regular mt-4 text-dark-400">{subtitle}</p>
      )}
    </div>
  );
};

export default TransformationHeader;
