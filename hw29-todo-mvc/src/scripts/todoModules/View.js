"use strict";

import { SELECTORS } from "../selectors.js";
import { MESSAGES } from "../messages.js";

const CLASSES = {
  active: "active",
  invalid: "is-invalid",
  completedTitle: ["text-decoration-line-through", "text-body-secondary"],
  badge: "badge mb-1",
  badgeFallback: "text-bg-light",
  priorityBadge: {
    high: "text-bg-danger",
    medium: "text-bg-warning",
    low: "text-bg-secondary",
  },
  due: "d-block text-body-secondary",
  dueOverdue: "d-block fw-semibold text-danger-emphasis",
  rowOverdue: "list-group-item-danger",
  emptyItem: "list-group-item text-body-secondary",
};

const View = ({ root, Modal }) => {
  const list = root.querySelector(SELECTORS.list);
  const todoTemplate = root.querySelector(SELECTORS.todoTemplate);
  const createForm = root.querySelector(SELECTORS.createForm);
  const createError = root.querySelector(SELECTORS.createError);
  const searchForm = root.querySelector(SELECTORS.searchForm);
  const filterGroup = root.querySelector(SELECTORS.filterGroup);
  const editEl = root.querySelector(SELECTORS.editModal);
  const deleteEl = root.querySelector(SELECTORS.deleteModal);
  const editForm = root.querySelector(SELECTORS.editForm);
  const editError = root.querySelector(SELECTORS.editError);
  const editModal = Modal.getOrCreateInstance(editEl);
  const deleteModal = Modal.getOrCreateInstance(deleteEl, {
    backdrop: "static",
    keyboard: false,
  });
  const statsEl = root.querySelector(SELECTORS.stats);
  const clearButton = root.querySelector(SELECTORS.clearButton);

  const formatUtc = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toISOString().slice(0, 19).replace("T", " ") + " UTC";
  };

  const getTodoId = (target) => {
    const id = Number(target.closest(SELECTORS.todoId)?.dataset.todoId);
    return Number.isInteger(id) && id > 0 ? id : null;
  };

  const readTodoForm = (form) => {
    const { title, description, priority, dueDate } = form.elements;
    return {
      title: title.value,
      description: description.value,
      priority: priority.value,
      dueDate: dueDate.value,
    };
  };

  const createTodoTemplate = ({
    id,
    title,
    description,
    completed,
    createdAt,
    updatedAt,
  }) => {
    const li = todoTemplate.content.firstElementChild.cloneNode(true);
    li.dataset.todoId = id;
    li.querySelector(SELECTORS.title).textContent = title;
    li.querySelector(SELECTORS.description).textContent = description;
    const isUpdated = Boolean(updatedAt);
    li.querySelector(SELECTORS.dateLabel).textContent = isUpdated
      ? MESSAGES.updated
      : MESSAGES.created;
    li.querySelector(SELECTORS.date).textContent = isUpdated
      ? formatUtc(updatedAt)
      : formatUtc(createdAt);
    li.querySelector(SELECTORS.toggle).checked = completed;

    if (completed) {
      li.querySelector(SELECTORS.title).classList.add(
        ...CLASSES.completedTitle,
      );
    }
    return li;
  };

  const decorateTodo = (li, { priority, dueDate, overdue }) => {
    const body = li.querySelector(SELECTORS.todoBody);
    const badge = document.createElement("span");
    badge.className = `${CLASSES.badge} ${Object.hasOwn(CLASSES.priorityBadge, priority) ? CLASSES.priorityBadge[priority] : CLASSES.badgeFallback}`;
    badge.textContent = priority;
    body.prepend(badge);
    if (dueDate) {
      const due = document.createElement("small");
      due.className = overdue ? CLASSES.dueOverdue : CLASSES.due;
      due.textContent = overdue
        ? MESSAGES.dueOverdue(formatUtc(dueDate))
        : MESSAGES.due(formatUtc(dueDate));
      body.append(due);
    }
    li.classList.toggle(CLASSES.rowOverdue, overdue);
    return li;
  };

  const renderTodos = (todos) => {
    const fragment = new DocumentFragment();
    todos.forEach((todo) =>
      fragment.append(decorateTodo(createTodoTemplate(todo), todo)),
    );
    if (!todos.length) {
      const empty = document.createElement("li");
      empty.className = CLASSES.emptyItem;
      empty.textContent = MESSAGES.emptyList;
      fragment.append(empty);
    }
    list.replaceChildren(fragment);
  };

  const renderStats = ({ active, completed }) => {
    statsEl.textContent = MESSAGES.stats(active, completed);
  };

  const renderEditTodoModalData = (todo) => {
    editEl.querySelector(SELECTORS.modalTitle).textContent = MESSAGES.editTitle(
      todo.id,
    );
    editForm.elements.title.value = todo.title;
    editForm.elements.description.value = todo.description;
    editForm.elements.priority.value = todo.priority;
    editForm.elements.dueDate.value = todo.dueDate.slice(0, 19);
    showEditError("");
  };

  const renderDeleteTodoModalData = (todo) => {
    const text = deleteEl.querySelector(SELECTORS.deleteText);
    const strong = document.createElement("b");
    strong.textContent = todo.title;
    text.replaceChildren(MESSAGES.deleteOne, strong, "?");
  };

  const renderClearCompletedModalData = (count) => {
    deleteEl.querySelector(SELECTORS.deleteText).textContent =
      MESSAGES.deleteMany(count);
  };

  const showCreateError = (message) => {
    createError.textContent = message;
    createForm.elements.title.classList.toggle(CLASSES.invalid, Boolean(message));
  };

  const showEditError = (message) => {
    editError.textContent = message;
    editForm.elements.title.classList.toggle(CLASSES.invalid, Boolean(message));
  };

  const resetCreateForm = () => {
    createForm.reset();
    showCreateError("");
    createForm.elements.title.focus();
  };

  const focusToggle = (id) => {
    list.querySelector(
      `${SELECTORS.todoById(id)} ${SELECTORS.toggle}`,
    )?.focus();
  };

  const setActiveFilter = (status) => {
    filterGroup.querySelectorAll(SELECTORS.filter).forEach((btn) => {
      const on = btn.dataset.filter === status;
      btn.classList.toggle(CLASSES.active, on);
      btn.setAttribute("aria-pressed", String(on));
    });
  };

  const openEditModal = () => editModal.show();

  const closeEditModal = () => editModal.hide();

  const openDeleteModal = () => deleteModal.show();

  const closeDeleteModal = () => deleteModal.hide();

  const bindCreate = (handler) => {
    createForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(readTodoForm(createForm));
    });
  };

  const bindToggle = (handler) => {
    list.addEventListener("change", (e) => {
      if (!e.target.matches(SELECTORS.toggle)) return;
      const id = getTodoId(e.target);
      if (id !== null) handler(id);
    });
  };

  const bindSearch = (handler) => {
    const input = searchForm.elements.query;
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(input.value);
    });
    input.addEventListener("input", () => handler(input.value));
  };

  const bindFilter = (handler) => {
    filterGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(SELECTORS.filter);
      if (btn) handler(btn.dataset.filter);
    });
  };

  const bindRowAction = (selector, handler) => {
    list.addEventListener("click", (e) => {
      if (!e.target.closest(selector)) return;
      const id = getTodoId(e.target);
      if (id !== null) handler(id);
    });
  };

  const bindEditRequest = (handler) => bindRowAction(SELECTORS.edit, handler);

  const bindDeleteRequest = (handler) => bindRowAction(SELECTORS.delete, handler);

  const bindEditSubmit = (handler) => {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(readTodoForm(editForm));
    });
  };

  const bindDeleteConfirm = (handler) => {
    deleteEl.addEventListener("click", (e) => {
      if (e.target.closest(SELECTORS.confirmDelete)) handler();
    });
  };

  const bindModalHidden = (handler) => {
    [editEl, deleteEl].forEach((el) => {
      el.addEventListener("hide.bs.modal", () => document.activeElement?.blur());
      el.addEventListener("hidden.bs.modal", handler);
    });
  };

  const bindClearCompleted = (handler) => {
    clearButton.addEventListener("click", () => handler());
  };

  return {
    renderTodos,
    renderStats,
    renderEditTodoModalData,
    renderDeleteTodoModalData,
    renderClearCompletedModalData,
    showCreateError,
    showEditError,
    resetCreateForm,
    focusToggle,
    setActiveFilter,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    bindCreate,
    bindToggle,
    bindSearch,
    bindFilter,
    bindEditRequest,
    bindDeleteRequest,
    bindEditSubmit,
    bindDeleteConfirm,
    bindModalHidden,
    bindClearCompleted,
  };
};

export default View;
