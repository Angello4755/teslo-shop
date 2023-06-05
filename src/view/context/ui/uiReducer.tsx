import { UIState } from "./UIProvider";

type UIActionType = { type: "UI - Toggle Sidebar" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Toggle Sidebar":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
};
