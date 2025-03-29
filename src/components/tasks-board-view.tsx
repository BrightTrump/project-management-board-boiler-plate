"use client";
import React, { useMemo, useState } from "react";
import { Button, ButtonVariants, Icon, Icons } from "@/ui";
import { Column, Id, Task } from "@/@types/react-dnd-kit.type";
import ColumnContainer from "./column-container";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./task-card";

// Generate Id for column and task
const generateId = () => {
  return Math.floor(Math.random() * 10000);
};
// let columnCounter = 1;
// let taskCounter = 1;
// const generateColumnId = () => columnCounter++;
// const generateTaskId = () => taskCounter++;
export default function TasksBoardView() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [iscentered, setiscentered] = useState(true);
  // console.log(columns);
  const columnsId = useMemo(
    () => columns.map((col) => col.id ?? generateId()),
    [columns]
  );
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //3px
      },
    })
  );

  //Here take the different functions
  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
    setiscentered(false);
  };

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
      label: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  };

  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((col) => col.id !== id);
    setTasks(filteredTasks);
  };

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  };

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("Drag Start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveATask) return;

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((task) => task.id === activeId);
      if (activeIndex === -1) return tasks; // this ensure the task exists

      // Dropping a task on an empty column
      if (isOverAColumn) {
        tasks[activeIndex].columnId = overId;
        return [...tasks];
      }

      if (isOverATask) {
        const overIndex = tasks.findIndex((task) => task.id === overId);
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      }

      return tasks;
    });
  };

  return (
    <div className="w-full h-screen grid justify-start overflow-x-auto custom-scroll-bar">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="grid grid-flow-col auto-cols-max gap-5 items-start overflow-x-auto custom-scroll-bar">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>

          {/* Add Column Button Stays at the Right */}
          {/* <div className="flex justify-start"> */}
          <div
            className={`${
              iscentered
                ? "mx-auto grid place-items-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                : "ml-0"
            } `}
          >
            <Button
              type="submit"
              onClick={createNewColumn}
              variant={ButtonVariants.Neutral}
              className="cursor-pointer"
            >
              <Icon type={Icons.GroupPlus} size={14} color="black" />
              <span>Add column</span>
            </Button>
          </div>
        </div>

        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}
