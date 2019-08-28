import React from "react";

const WithShortcut = props => {
  const { text, shortcutRef, id } = props;

  return (
    <>
      {text}
      {shortcutRef && shortcutRef.renderShortcutLabel(id)}
    </>
  );
};

export default WithShortcut;
