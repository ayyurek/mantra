import { MouseEventHandler } from "react";

export const disableContextMenu: MouseEventHandler<HTMLElement> = (e) => {
	//Disabling context menu for the touch screen
	e.preventDefault();
	return false;
};
