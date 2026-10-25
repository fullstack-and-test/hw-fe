"use strict";

import Model from "./todoModules/Model.js";
import View from "./todoModules/View.js";
import Controller from "./todoModules/Controller.js";
import UrlState from "./urlState.js";
import todos from "./data/todos.js";
import { LS_TODOS_KEY } from "./constants.js";

const model = Model(LS_TODOS_KEY, todos, localStorage);
const view = View({ root: document, Modal: window.bootstrap.Modal });
const urlState = UrlState({
  location: window.location,
  history: window.history,
});
Controller(model, view, urlState);
