import React from "react";
import type { ListSectionType } from "../../types";

export const ListSection: React.FC<Omit<ListSectionType, "type">> = ({ id, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <ul id={id}>
      {items.map((item, index) => (
        <li key={index}>
          <span>{item.text}</span>
          {item.meta && (
            <span style={{ marginLeft: "8px", fontSize: "0.8em", color: "gray" }}>
              ({item.meta})
            </span>
          )}
          {item.deprecatedLabel && (
            <span
              style={{
                marginLeft: "8px",
                color: "red",
                fontSize: "0.7em",
                border: "1px solid red",
                padding: "2px",
              }}
            >
              {item.deprecatedLabel}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListSection;
