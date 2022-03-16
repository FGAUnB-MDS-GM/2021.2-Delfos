export interface ToDoProps {
  identifier: string;
  message: string;
  trigger: {
    type: string,
    repeat?: boolean,
    hour?: number,
    minute?: number,
    weekday?: number,
  };
  checked?: boolean;
}