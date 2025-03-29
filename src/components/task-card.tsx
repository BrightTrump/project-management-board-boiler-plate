import React, { useState } from "react";
import { Id, Task } from "@/@types/react-dnd-kit.type";
import { Icon, Icons } from "@/ui";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import PhotoViewer from "./_shared/profile-initials";
// import { useAuthUser } from "@/hooks/auth/auth-user.hook";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

export default function TaskCard({
  task,
  deleteTask,
  updateTask,
}: TaskCardProps) {
  // const { profile } = useAuthUser();

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const [title, setTitle] = useState(task.content);
  const [label, setLabel] = useState("Label"); // Assuming Label is dynamic.

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id!,
    data: {
      type: "Task",
      task,
    },
    disabled: editTitle || editLabel,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTitleBlur = () => {
    if (title.trim() === "") {
      setTitle(task.content); // Restore original title if left empty
    } else {
      updateTask(task.id, title);
    }
    setEditTitle(false);
  };

  const handleLabelBlur = () => {
    if (label.trim() === "") {
      setLabel("Label");
    }
    setEditLabel(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-64 h-fit bg-[#FFFFFF] rounded-sm p-2 text-sm hover:border-[#DFDFDF] border-2 hover:border-2 cursor-grab"
      >
        <div className="grid grid-rows-[auto auto auto] gap-4">
          {/* Task Title */}
          <div className="text-[#252525]">
            <p className="my-auto whitespace-pre-wrap pb-1 text-sm">{title}</p>

            {/* MVP 1 (Editable) */}
            <p className="my-auto whitespace-pre-wrap text-xs">{label}</p>
          </div>

          <div className="w-fit grid grid-cols-[auto_1fr] gap-1 items-center bg-[#f5d9d6] rounded-3xl py-1 px-2">
            <Icon type={Icons.Ellipse} size={6} color="#F04438" />
            <p className="text-[#F04438] text-xs">High</p>
          </div>

          <div className="grid grid-flow-col gap-1 items-center text-[#252525]">
            <div className="grid grid-cols-[auto_1fr] gap-1 items-center">
              <Icon type={Icons.Calendar} size={16} color="#252525" />
              <p>27/2/25</p>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-1 items-center">
              {/* <PhotoViewer
                size={20}
                variants="primaryBg"
                firstLetter={profile?.firstName[0] || ""}
                secondLetter={profile?.lastName[0] || ""}
              /> */}
              <div className="h-6 w-6 rounded-full bg-primary">BM</div>
              <div>
                <span className="text-sm">Bright Munemu</span>
              </div>
            </div>
          </div>
        </div>

        {mouseIsOver && (
          <button
            onClick={() => deleteTask(task.id!)}
            className="p-2 rounded-md absolute right-0 top-0 hover:bg-[#DFDFDF] opacity-60 hover:opacity-100"
          >
            <Icon type={Icons.Bin} size={16} color="#005AFF" />
          </button>
        )}
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-64 min-h-[134px] bg-[#FFFFFF] rounded-sm p-2 text-sm hover:border-[#DFDFDF] hover:border-2 cursor-grab"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div className="grid grid-rows-[auto auto auto] gap-4">
        {/* Task Title */}
        <div className="text-[#252525]">
          {editTitle ? (
            <input
              value={title}
              className="w-full h-auto min-h-[60%] resize-none border-2 border-[#252525] p-2 rounded-sm bg-transparent text-[#555555] focus:outline-none bg-red-500"
              placeholder="Task title here"
              autoFocus
              onBlur={handleTitleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleBlur();
              }}
              onChange={(e) => setTitle(e.target.value)}
              onMouseEnter={() => setMouseIsOver(false)}
              onMouseLeave={() => setMouseIsOver(true)}
            />
          ) : (
            <p
              className="my-auto whitespace-pre-wrap pb-1 text-sm"
              onClick={() => setEditTitle(true)}
            >
              {title}
            </p>
          )}

          {/* MVP 1 (Editable) */}
          {editLabel ? (
            <input
              value={label}
              className=" w-full h-auto min-h-[50%] resize-none border-2 border-[#252525] p-2 rounded-sm bg-transparent text-[#555555] focus:outline-none text-xs"
              placeholder="Label"
              autoFocus
              onBlur={handleLabelBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLabelBlur();
              }}
              onChange={(e) => setLabel(e.target.value)}
            />
          ) : (
            <p
              className="my-auto whitespace-pre-wrap text-xs"
              onClick={() => setEditLabel(true)}
            >
              {label}
            </p>
          )}
        </div>

        <div className="w-fit grid grid-cols-[auto_1fr] gap-1 items-center bg-[#f5d9d6] rounded-3xl py-1 px-2">
          <Icon type={Icons.Ellipse} size={6} color="#F04438" />
          <p className="text-[#F04438] text-xs">High</p>
        </div>

        <div className="grid grid-flow-col justify-between items-center text-[#252525]">
          <div className="grid grid-cols-[auto_1fr] gap-1 items-center">
            <Icon type={Icons.Calendar} size={16} color="#252525" />
            <p>27/2/25</p>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-1 items-center">
            {/* <PhotoViewer
                size={20}
                variants="primaryBg"
                firstLetter={profile?.firstName[0] || ""}
                secondLetter={profile?.lastName[0] || ""}
              /> */}
            <div className="h-5 w-5 rounded-full bg-blue-700 grid place-items-center">
              <p className="text-[9px] text-white">BM</p>
            </div>

            {/* <span className="text-sm">Bright Munemu</span> */}
          </div>
        </div>
        <div className="grid grid-flow-col justify-self-start items-center gap-1">
          <div className="grid place-items-center bg-white border-2 border-blue-700 rounded-md">
            <Icon type={Icons.Check} size={10} color="black" />
          </div>
          <span className="text-sm">EN-{task.id}</span>
        </div>
      </div>

      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id!)}
          className="p-2 rounded-md absolute right-0 top-0 hover:bg-[#DFDFDF] opacity-60 hover:opacity-100"
        >
          <Icon type={Icons.Bin} size={16} color="#005AFF" />
        </button>
      )}
    </div>
  );
}
