import React, { Component } from "react";
import styled from "styled-components";
import ShortcutLabel from "./ShortcutLabel";

const ScopeWrapper = styled.div`
  height: 100%;
  &:focus {
    /* outline: 0; */
  }
`;

class ShortcutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bindsConfig: [],
      focus: false
    };
  }

  componentWillReceiveProps(props) {
    this._bindAll(props);
  }

  renderShortcutLabel = id => {
    const { bindsConfig, focus } = this.state;
    let shortcut = {};

    bindsConfig.forEach(bindConfig => {
      if (bindConfig.id === id) {
        shortcut.text = this._keysToText(bindConfig);
        shortcut.disabled = !focus;
      }
    });

    const { text, disabled } = shortcut;
    return <ShortcutLabel text={text} disabled={disabled} />;
  };

  unbindAll = () => {
    this.setState({ bindsConfig: [] });
  };

  disableShortcut = id => {
    const { bindsConfig } = this.state;

    this.setState({
      bindsConfig: bindsConfig.map(bindConfig => {
        if (bindConfig.id !== id) {
          return bindConfig;
        }
        return { ...bindConfig, disabled: true };
      })
    });
  };

  enableShortcut = id => {
    const { bindsConfig } = this.state;

    this.setState({
      bindsConfig: bindsConfig.map(bindConfig => {
        if (bindConfig.id !== id) {
          return bindConfig;
        }
        return { ...bindConfig, disabled: false };
      })
    });
  };

  render() {
    const { children, forceUpdate } = this.props;
    return (
      <ScopeWrapper
        tabIndex="0"
        onKeyDown={this._onKeyDown}
        onFocus={() => {
          this.setState({ focus: true });
          forceUpdate && forceUpdate();
        }}
        onBlur={() => {
          this.setState({ focus: false });
          forceUpdate && forceUpdate();
        }}
      >
        {children}
      </ScopeWrapper>
    );
  }

  // Private Methods

  _bindAll = props => {
    const { bindsConfig } = props;
    this.setState({
      bindsConfig: bindsConfig.map(bindConfig => {
        return this._bind(bindConfig);
      })
    });
  };

  _bind = ({ id, keys, callback }) => {
    const key = this._getKey(keys);

    if (!key) {
      console.error(
        `[SHORTCUT MANAGER]: Config Identifier: ${id} => Expected valid key shortcut [A ~ Z] on array:`,
        keys
      );
      return;
    }

    return {
      id,
      callback,
      shiftPressed: keys.includes("shift"),
      ctrlPressed: keys.includes("command") || keys.includes("ctrl"),
      key,
      disabled: false
    };
  };

  _keysToText = bindConfig => {
    let text = "";
    if (bindConfig.shiftPressed) text += "SHIFT + ";
    if (bindConfig.ctrlPressed) text += "CTRL + ";
    text += bindConfig.key.toUpperCase();
    return text;
  };

  _getKey = keys => {
    return keys.filter(
      key => key !== "shift" && key !== "ctrl" && key !== "command"
    )[0];
  };

  _matchShiftPressed = (event, status) => event.shiftKey === status;
  _matchCtrlPressed = (event, status) => event.ctrlKey === status;
  _matchKey = (event, key) => event.keyCode === key.charCodeAt(0);

  _matchKeys = (event, bindConfig) => {
    const { shiftPressed, ctrlPressed, key } = bindConfig;
    return (
      this._matchShiftPressed(event, shiftPressed) &&
      this._matchCtrlPressed(event, ctrlPressed) &&
      this._matchKey(event, key)
    );
  };

  _onKeyDown = event => {
    const { bindsConfig } = this.state;

    if (this._matchKey(event, "Shift") || this._matchKey(event, "Control")) {
      return;
    }

    bindsConfig.forEach(bindConfig => {
      const { id, disabled, callback } = bindConfig;

      if (disabled) {
        console.log(`[SHORTCUT MANAGER]: Listener ${id} disabled`);
        return;
      }

      if (this._matchKeys(event, bindConfig)) {
        event.preventDefault();
        callback();
      }
    });
  };
}

export default ShortcutManager;
