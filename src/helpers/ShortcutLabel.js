import React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";

const Label = styled.span`
  color: ${props => (props.disabled ? "#AAA" : "#000")};
  font-size: 6pt;
  margin-left: 10px;
`;

const ShortcutLabel = ({ text, disabled }) => {
  if (!text) return "";
  return (
    <Tooltip title="Atalho">
      <Label disabled={disabled}>({text})</Label>
    </Tooltip>
  );
};

export default ShortcutLabel;
