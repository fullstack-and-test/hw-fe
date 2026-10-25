"use strict";

import { PRIORITIES } from "../constants.js";
import { MESSAGES } from "../messages.js";

const now = () => new Date().toISOString();

const Model = (lsKey, defaultData, storage) => {
  const withDefaults = (todo) => ({
    priority: "medium",
    ...todo,
    dueDate: cleanDueDate(todo.dueDate),
  });
  const getData = () =>
    (JSON.parse(storage.getItem(lsKey)) ?? []).map(withDefaults);
  const setData = (todos) => storage.setItem(lsKey, JSON.stringify(todos));

  if (storage.getItem(lsKey) === null) setData(defaultData);

  const cleanTitle = (title) => {
    const value = String(title ?? "").trim();
    if (!value) throw new Error(MESSAGES.titleRequired);
    return value;
  };

  const cleanPriority = (priority) =>
    PRIORITIES.includes(priority) ? priority : "medium";


  const cleanDueDate = (dueDate) => {
    const value = String(dueDate ?? "");
    const local = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(?::(\d{2}))?$/.exec(value);
    const iso = local
      ? `${local[1]}T${local[2]}:${local[3] ?? "00"}.000Z`
      : /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? `${value}T23:59:59.000Z`
        : value;
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(iso) &&
      !Number.isNaN(Date.parse(iso))
      ? iso
      : "";
  };

  const byPriority = (a, b) =>
    PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority);

  const isOverdue = (todo, nowIso) =>
    Boolean(todo.dueDate) && !todo.completed && todo.dueDate < nowIso;

  const matchesQuery = (todo, query) =>
    todo.title.toLowerCase().includes(query.trim().toLowerCase());

  const matchesStatus = (todo, status) =>
    status === "active"
      ? !todo.completed
      : status === "completed"
        ? todo.completed
        : true;

  const searchTodos = (query) =>
    getData().filter((t) => matchesQuery(t, query));

  const filterTodos = (status) =>
    getData().filter((t) => matchesStatus(t, status));

  const getVisibleTodos = ({ query = "", status = "all" }) => {
    const nowIso = now();
    return getData()
      .filter((t) => matchesQuery(t, query) && matchesStatus(t, status))
      .toSorted(byPriority)
      .map((todo) => ({ ...todo, overdue: isOverdue(todo, nowIso) }));
  };

  const getTodoById = (id) => getData().find((todo) => todo.id === id);

  const getStats = () => {
    const todos = getData();
    const completed = todos.filter((t) => t.completed).length;
    return { active: todos.length - completed, completed };
  };

  const addTodo = ({ title, description = "", priority, dueDate }) => {
    const todos = getData();
    const id = todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
    const date = now();
    const todo = {
      id,
      title: cleanTitle(title),
      description: String(description).trim(),
      completed: false,
      priority: cleanPriority(priority),
      dueDate: cleanDueDate(dueDate),
      createdAt: date,
      updatedAt: null,
    };

    setData([...todos, todo]);
    return todo;
  };

  const updateTodoById = ({ id, title, description = "", priority, dueDate }) => {
    const todos = getData();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) throw new Error(`Could not find todo #${id}`);
    todos[index] = {
      ...todos[index],
      title: cleanTitle(title),
      description: String(description).trim(),
      priority: cleanPriority(priority),
      dueDate: cleanDueDate(dueDate),
      updatedAt: now(),
    };
    setData(todos);
  };

  const toggleTodoById = (id) => {
    const todos = getData();
    const todo = todos.find((t) => t.id === id);
    if (!todo) throw new Error(`Could not find todo #${id}`);
    todo.completed = !todo.completed;
    todo.updatedAt = now();
    setData(todos);
  };

  const removeTodoById = (id) => {
    const todos = getData();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) throw new Error(`Could not find todo #${id}`);
    todos.splice(index, 1);
    setData(todos);
  };

  const removeCompleted = () =>
    setData(getData().filter((todo) => !todo.completed));

  return {
    getData,
    searchTodos,
    filterTodos,
    getVisibleTodos,
    getTodoById,
    getStats,
    addTodo,
    updateTodoById,
    toggleTodoById,
    removeTodoById,
    removeCompleted,
  };
};

export default Model;
