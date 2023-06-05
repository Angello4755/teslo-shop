import React, { FC, ReactElement, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
};

interface Props {
  children: ReactElement;
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toogleSideMenu = () => {
    dispatch({ type: "UI - Toggle Sidebar" });
  };

  return (
    <UIContext.Provider value={{ ...state, toogleSideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
