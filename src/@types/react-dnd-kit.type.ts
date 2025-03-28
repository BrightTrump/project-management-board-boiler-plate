export type Id = string | number;

export interface Card {
  id: Id;
  title: string;
  description?: string;
}

export type Column = {
  id?: Id;
  title?: string;
  cards?: Card[];
};

export interface Task {
  id: Id;
  columnId: Id;
  content: string;
  label: string;
}
