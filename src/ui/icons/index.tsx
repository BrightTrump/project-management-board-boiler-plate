import Bin from "./bin";
import Check from "./check";
import ChevronDown from "./chevron-down";
import ChevronLeft from "./chevron-left";
import ChevronRight from "./chevron-right";
import ChevronUp from "./chevron-up";
import Calendar from "./calendar";
import { IconProps, Icons } from "./types";
import TableBin from "./table-bin";
import GroupMinus from "./group-minus";
import GroupPlus from "./group-plus";
import CheckIn from "./Check-in";
import RoundCalender from "./round-calender";
import Plus from "./plus";
import EditSquare from "./edit-square";
import Ellipse from "./ellipse";
import Milestone from "./milestone";
import Board from "./board";

interface Props extends IconProps {
  type: Icons;
}
export function Icon({ type, color, size }: Props) {
  const props = { color, size };

  switch (type) {
    case Icons.Bin:
      return <Bin {...props} />;

    case Icons.Board:
      return <Board {...props} />;

    case Icons.Calendar:
      return <Calendar {...props} />;

    case Icons.Check:
      return <Check {...props} />;

    case Icons.CheckIn:
      return <CheckIn {...props} />;

    case Icons.ChevronDown:
      return <ChevronDown {...props} />;

    case Icons.ChevronLeft:
      return <ChevronLeft {...props} />;

    case Icons.ChevronRight:
      return <ChevronRight {...props} />;

    case Icons.ChevronUp:
      return <ChevronUp {...props} />;

    case Icons.EditSquare:
      return <EditSquare {...props} />;

    case Icons.Ellipse:
      return <Ellipse {...props} />;

    case Icons.GroupMinus:
      return <GroupMinus {...props} />;

    case Icons.GroupPlus:
      return <GroupPlus {...props} />;

    case Icons.Milestone:
      return <Milestone {...props} />;

    case Icons.Plus:
      return <Plus {...props} />;

    case Icons.RoundCalendar:
      return <RoundCalender {...props} />;

    case Icons.TableBin:
      return <TableBin {...props} />;

    default:
      return <p>Pick an Icon</p>;
  }
}
