module.exports = {
  ADD_TO_TEXT: "ADD_TO_TEXT",
  ACCOUNT_LOGIN: "ACCOUNT_LOGIN",
  CHANGE_ONLINE_STATUS: "CHANGE_ONLINE_STATUS",
  OPEN_CREATED_PROJECT: "OPEN_CREATED_PROJECT",
  CREATE_PROJECT: "CREATE_PROJECT",
  CHANGE_CREATE_PROJECT_TEXT: "CHANGE_CREATE_PROJECT_TEXT",
  SEND_FETCH_DATA: "SEND_FETCH_DATA",
  SEND_PROGRESS_FOR_KEY: "SEND_PROGRESS_FOR_KEY",
  DONE_LOADING: "DONE_LOADING",
  CHANGE_PROFILE_VISIBILITY: "CHANGE_PROFILE_VISIBILITY",
  NEW_PROJECT: "NEW_PROJECT",
  OPEN_VIEW: "OPEN_VIEW",
  CHANGE_CHECK_MODAL_VISIBILITY: "CHANGE_CHECK_MODAL_VISIBILITY",
  ALERT_MODAL: "ALERT_MODAL",
  ALERT_MODAL_RESPONSE: "ALERT_MODAL_RESPONSE",
  MOD_PROGRESS_VIEW: "MOD_PROGRESS_VIEW",
  CHANGE_BUTTON_STATUS: "CHANGE_BUTTON_STATUS",
  SHOW_TOAST_PARAMS: "SHOW_TOAST_PARAMS",
  START_LOADING: "START_LOADING",
  UPDATE_POPOVER: "UPDATE_POPOVER",
  SHOW_APPS: "SHOW_APPS",
  SHOW_MODAL_CONTAINER: "SHOW_MODAL_CONTAINER",
  SELECT_MODAL_TAB: "SELECT_MODAL_TAB",
  SET_USER_NAME: "SET_USER_NAME",
  SET_USER_PASSWORD: "SET_USER_PASSWORD",
  TOGGLE_ACOUNT_VIEW_TO_LOGIN: "TOGGLE_ACOUNT_VIEW_TO_LOGIN",
  LOGOUT_USER: "LOGOUT_USER",
  RECEIVE_LOGIN: "RECEIVE_LOGIN",
  CHANGE_SETTINGS: "CHANGE_SETTINGS",
  DRAG_DROP_SENDPATH: "DRAG_DROP_SENDPATH",
  DRAG_DROP_OPENDIALOG: "DRAG_DROP_OPENDIALOG",
  GET_TOOLS_METADATAS: "GET_TOOLS_METADATAS",
  LOAD_TOOL: "LOAD_TOOL",
  SYNC_PROJECT: "SYNC_PROJECT",
  GET_RECENT_PROJECTS: "GET_RECENT_PROJECTS",
  VALID_OPENED_PROJECT: "VALID_OPENED_PROJECT",
  CHANGED_IMPORT_VIEW: "CHANGED_IMPORT_VIEW",
  RECIEVE_REPOS: "RECIEVE_REPOS",
  IMPORT_LINK: "IMPORT_LINK",
  LOAD_REPORTS: "LOAD_REPORTS",
  FEEDBACK_CHANGE: "FEEDBACK_CHANGE",
  SUBMIT_FEEDBACK: "SUBMIT_FEEDBACK",
  KILL_LOADING: "KILL_LOADING",
  CHANGE_WRAPPER_VIEW: "CHANGE_WRAPPER_VIEW",
  TOGGLE_LOADER_MODAL: "TOGGLE_LOADER_MODAL",
  SHOW_NOTIFICATION: "SHOW_NOTIFICATION",
  HIDE_NOTIFICATION: "HIDE_NOTIFICATION",
  FEEDBACK_SUBJECT_CHANGE: 'FEEDBACK_SUBJECT_CHANGE',
  TOGGLE_SUBMENU: "TOGGLE_SUBMENU",
  TOGGLE_MENU_DRAWER: "TOGGLE_MENU_DRAWER",
  SELECT_MODAL_SECTION: "SELECT_MODAL_SECTION",
  SHOW_POPOVER: "SHOW_POPOVER",
  CLOSE_POPOVER: "CLOSE_POPOVER",
  SAVE_MODULE: 'SAVE_MODULE',
  ADD_NEW_BIBLE_TO_RESOURCES: 'ADD_NEW_BIBLE_TO_RESOURCES',
  ADD_NEW_RESOURCE: 'ADD_NEW_RESOURCE',
  SET_PROJECT_NAME_AND_PATH: 'SET_PROJECT_NAME_AND_PATH',
  SET_SAVE_PATH_LOCATION: 'SET_SAVE_PATH_LOCATION',
  CHANGED_CHECK_STATUS: "CHANGED_CHECK_STATUS",
  LOADER_TOO_LONG: "LOADER_TOO_LONG",
  FETCH_DATA_NUMBER: "FETCH_DATA_NUMBER",
  UPDATE_PROGRESS: "UPDATE_PROGRESS",
  SHOW_ALERT_MODAL: "SHOW_ALERT_MODAL",
  TOGGLE_MORE_INFO: "TOGGLE_MORE_INFO",
  UPDATE_LOADER: "UPDATE_LOADER",
  UPDATE_MODULE_DATA_SELECTION_ID: "UPDATE_MODULE_DATA_SELECTION_ID",
  UPDATE_MODULE_DATA_COMMENT_ID: "UPDATE_MODULE_DATA_COMMENT_ID",
  UPDATE_MODULE_DATA_VERSEEDIT_ID: "UPDATE_MODULE_DATA_VERSEEDIT_ID",
  UPDATE_MODULE_DATA_REMINDER_ID: "UPDATE_MODULE_DATA_REMINDER_ID",
  LINK_MODULE_DATA: "LINK_MODULE_DATA",
  TOGGLE_REMINDER: "TOGGLE_REMINDER",
  ADD_COMMENT: "ADD_COMMENT",
  ADD_VERSE_EDIT: 'ADD_VERSE_EDIT'
};

/**
Object that maps words to consts for use in actions
For example, in a register callback in a Store, it is recommended
that when you check the action type, you do it in the following manner:
var consts = require("CoreActionConsts.js");
...
if (action == consts.ADD_CHECK)
rather than
if (action == "ADD_CHECK")

*/
