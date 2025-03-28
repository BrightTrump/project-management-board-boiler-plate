"use client";
import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "@/@types/react-dnd-kit.type";
import { Icon, Icons } from "@/ui";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./task-card";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  deleteTask: (id: Id) => void;
  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
}

export default function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  tasks,
}: ColumnContainerProps) {
  const [editMode, setEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id!,
    data: { type: "Column", column },
    disabled: editMode, // Disable drag while editing
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-borderColor w-[274px] h-[700px] font-semibold text-sm rounded-md opacity-60 border-2 border-black"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="grid grid-rows-[auto_1fr_auto] gap-1 bg-[#F8F8F8] w-[274px] h-[700px] font-semibold text-sm rounded-sm"
    >
      {/* Column Header */}
      <div
        className=""
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          {...(!editMode && attributes)}
          {...(!editMode && listeners)}
          className="grid grid-flow-col items-center justify-between bg-lightWhite cursor-grab p-2 text-[#252525] rounded-sm"
        >
          <div className="flex items-center space-x-1 w-full">
            {!editMode ? (
              <span
                className="w-full cursor-pointer"
                onClick={() => setEditMode(true)}
              >
                {column.title}
              </span>
            ) : (
              <input
                value={column.title}
                onChange={(e) => updateColumn(column.id!, e.target.value)}
                onBlur={() => setEditMode(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") setEditMode(false);
                }}
                autoFocus
                onClick={(e) => e.stopPropagation()} // Prevent dragging interference
                className="bg-white outline-none rounded-sm p-2 min-w focus:border-rose-500"
              />
            )}
            <div>(0)</div>
          </div>

          {!editMode && (
            <div className="grid grid-flow-col items-center gap-1">
              {/* Add task button */}
              <button
                onClick={() => createTask(column.id!)}
                className="flex items-center gap-1 rounded-sm p-2 hover:bg-white hover:rounded-full cursor-pointer"
              >
                <Icon type={Icons.GroupPlus} size={14} color="#005AFF" />
                <span className="text-[#005AFF]">Add task</span>
              </button>

              {/* Delete button (Visible on hover) */}
              {isHovered && (
                <button
                  onClick={() => deleteColumn(column.id!)}
                  className="hover:bg-baseBgColor p-2 rounded-xl cursor-pointer"
                >
                  <Icon type={Icons.Bin} size={16} color="#005AFF" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Column Task Container */}
      <div className="overflow-auto custom-scroll-bar ">
        <div className="grid gap-1 overflow-auto custom-scroll-bar rounded-sm p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
