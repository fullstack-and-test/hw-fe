"use strict";

export const MESSAGES = {
  titleRequired: "Title cannot be empty",
  created: "created",
  updated: "updated",
  emptyList: "No todos yet",
  editTitle: (id) => `Edit todo #${id}`,
  deleteOne: "Delete todo: ",
  deleteMany: (count) => `Delete all completed todos (${count})?`,
  stats: (active, completed) => `Active: ${active} · Completed: ${completed}`,
  due: (date) => `due ${date}`,
  dueOverdue: (date) => `due ${date} · overdue`,
};
