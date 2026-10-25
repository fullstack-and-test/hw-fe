"use strict";

import { STATUSES } from "../constants.js";
import { debounce } from "../utils.js";

const state = { query: "", status: "all" };

const Controller = (model, view, urlState) => {
  console.log("Controller started", { model, view, urlState });

  const readTodoId = () => {
    const raw = urlState.get("todoId");
    const id = Number(raw);
    return raw !== null && Number.isInteger(id) && id > 0 ? id : null;
  };

  const refresh = () => {
    view.renderTodos(model.getVisibleTodos(state));
    view.setActiveFilter(state.status);
    view.renderStats(model.getStats());
  };

  const openEdit = (todo) => {
    urlState.set({ action: "edit", todoId: todo.id });
    view.renderEditTodoModalData(todo);
    view.openEditModal();
  };

  const openDelete = (todo) => {
    urlState.set({ action: "delete", todoId: todo.id });
    view.renderDeleteTodoModalData(todo);
    view.openDeleteModal();
  };

  // open modal to confirm clearing of completed tasks
  const openClearCompleted = () => {
    const { completed } = model.getStats();
    if (!completed) return;
    urlState.set({ action: "clear-completed" });
    view.renderClearCompletedModalData(completed);
    view.openDeleteModal();
  };

  const ACTIONS = {
    edit: openEdit,
    delete: openDelete,
    "clear-completed": openClearCompleted,
  };

  const handleSearch = (query) => {
    state.query = query.trim();
    refresh();
  };

  const handleFilter = (status) => {
    state.status = STATUSES.includes(status) ? status : "all";
    if (state.status === "all") urlState.remove("filter");
    else urlState.set({ filter: state.status });
    refresh();
  };

  const handleCreate = (data) => {
    try {
      model.addTodo(data);
      view.resetCreateForm();
      refresh();
    } catch (error) {
      view.showCreateError(error.message);
    }
  };

  const handleToggle = (id) => {
    model.toggleTodoById(id);
    refresh();
  };

  const handleEditRequest = (id) => {
    const todo = model.getTodoById(id);
    if (todo) openEdit(todo);
  };

  const handleDeleteRequest = (id) => {
    const todo = model.getTodoById(id);
    if (todo) openDelete(todo);
  };

  const handleEditSubmit = (data) => {
    try {
      model.updateTodoById({ id: readTodoId(), ...data });
      refresh();
      view.closeEditModal();
    } catch (error) {
      view.showEditError(error.message);
    }
  };

  const handleDeleteConfirm = () => {
    try {
      if (urlState.get("action") === "clear-completed") model.removeCompleted();
      else model.removeTodoById(readTodoId());
    } catch (error) {
      console.warn(error.message);
    }
    refresh();
    view.closeDeleteModal();
  };

  const handleModalHidden = () => urlState.remove("action", "todoId");

  const restoreFromUrl = () => {
    const filter = urlState.get("filter");
    if (filter !== null) {
      if (STATUSES.includes(filter) && filter !== "all") state.status = filter;
      else urlState.remove("filter");
    }
    refresh();

    const action = urlState.get("action");
    if (action === null) return;
    const open = Object.hasOwn(ACTIONS, action) ? ACTIONS[action] : undefined;

    if (action === "clear-completed") {
      open();
      if (!model.getStats().completed) urlState.remove("action", "todoId");
      return;
    }

    const id = readTodoId();
    const todo = open && id !== null ? model.getTodoById(id) : undefined;
    if (!todo) {
      urlState.remove("action", "todoId");
      return;
    }
    open(todo);
  };

  view.bindCreate(handleCreate);
  view.bindToggle(handleToggle);
  view.bindSearch(debounce(handleSearch, 200));
  view.bindFilter(handleFilter);
  view.bindEditRequest(handleEditRequest);
  view.bindDeleteRequest(handleDeleteRequest);
  view.bindEditSubmit(handleEditSubmit);
  view.bindDeleteConfirm(handleDeleteConfirm);
  view.bindModalHidden(handleModalHidden);
  view.bindClearCompleted(openClearCompleted);

  restoreFromUrl();
};

export default Controller;
