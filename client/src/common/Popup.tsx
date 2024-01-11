import { useEffect } from "react";

import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/material";

import { useLocation } from "react-router-dom";
import { PropsPopup } from "../type";

const Popup = (props: PropsPopup) => {
  const { setAnchor, anchor, children } = props;
  const location = useLocation();

  useEffect(() => {
    return () => {
      setAnchor(null);
    };
  }, [location]);

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;
  const PopupBody = styled("div")(
    () => `
        width: max-content;
        padding: 12px 0px;
        margin: 8px;
        border-radius: 8px;
        border: 1px solid #DAE2ED;
        background-color: white;
        box-shadow: 0px 4px 8px rgb(0 0 0 / 0.1);
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        z-index: 1;
      `
  );
  return (
    <BasePopup id={id} open={open} anchor={anchor}>
      <PopupBody>{children}</PopupBody>
    </BasePopup>
  );
};

export default Popup;
