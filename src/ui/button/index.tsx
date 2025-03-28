import React from "react";
import { ButtonProps, ButtonVariants } from "./types";
import PrimaryFilled from "./primary-filled";
import PrimaryOutlined from "./primary-outlined";
import DangerOutlined from "./danger-outlined";
import Default from "./default";
import DangerFilled from "./danger-filled";
import Neutral from "./neutral";
import WhiteFilledRounded from "./white-filled-rounded";
import WhiteOutlinedRounded from "./white-outlined-rounded";
import PrimaryOutlinedRounded from "./primary-outlined-rounded";
import PrimaryFilledRounded from "./primary-filled-rounded";

export function Button(props: ButtonProps) {
  switch (props.variant) {
    case ButtonVariants.DangerFilled:
      return <DangerFilled {...props} />;

    case ButtonVariants.DangerOutlined:
      return <DangerOutlined {...props} />;

    case ButtonVariants.Neutral:
      return <Neutral {...props} />;

    case ButtonVariants.PrimaryFilled:
      return <PrimaryFilled {...props} />;
    case ButtonVariants.PrimaryFilledRounded:
      return <PrimaryFilledRounded {...props} />;

    case ButtonVariants.PrimaryOutlined:
      return <PrimaryOutlined {...props} />;

    case ButtonVariants.PrimaryOutlinedRounded:
      return <PrimaryOutlinedRounded {...props} />;

    case ButtonVariants.WhiteFilledRounded:
      return <WhiteFilledRounded {...props} />;

    case ButtonVariants.WhiteOutlinedRounded:
      return <WhiteOutlinedRounded {...props} />;

    default:
      return <Default {...props} />;
  }
}
