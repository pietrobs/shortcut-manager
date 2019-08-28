import React from "react";
import styled from "styled-components";

const ListWrapper = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  border: 1px solid black;
  margin-top: -1px;
  padding: 5px 20px;
  border-color: ${props => (props.selected ? "darkblue" : "black")};
  background-color: ${props => (props.selected ? "blue" : "white")};
  cursor: pointer;
`;

const List = props => {
  const { items, selectedId, selectItem, shortcutRef } = props;
  return (
    <ListWrapper>
      {items.map(({ id, name }) => (
        <Item
          key={id}
          onClick={() => selectItem(id)}
          selected={id === selectedId}
        >
          {name}{" "}
          {shortcutRef && shortcutRef.renderShortcutLabel(`ENTRANCE_${id}`)}
        </Item>
      ))}
    </ListWrapper>
  );
};

export default List;
