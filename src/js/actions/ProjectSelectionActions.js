import consts from './ActionTypes';
// actions
import * as AlertModalActions from './AlertModalActions';
import * as ModalActions from './ModalActions';
import * as ToolsMetadataActions from './ToolsMetadataActions';
import * as RecentProjectsActions from './RecentProjectsActions';
import * as BodyUIActions from './BodyUIActions';
import * as ProjectDetailsActions from './projectDetailsActions';
import * as TargetLanguageActions from './TargetLanguageActions';
import * as ResourcesActions from './ResourcesActions';
// helpers
import * as ProjectSelectionHelpers from '../helpers/ProjectSelectionHelpers';
import * as LoadHelpers from '../helpers/LoadHelpers';


export function selectProject(projectPath, projectLink) {
  return ((dispatch, getState) => {
    const { username } = getState().loginReducer.userdata;
    if (!projectPath) {
      return dispatch(AlertModalActions.openAlertDialog("No project path specified"));
    }
    projectPath = LoadHelpers.saveProjectInHomeFolder(projectPath);
    let manifest, params;
    let USFMFilePath = LoadHelpers.isUSFMProject(projectPath);
    if (USFMFilePath) {
      let {parsedUSFM, direction, targetLanguage} = ProjectSelectionHelpers.getProjectDetailsFromUSFM(USFMFilePath, projectPath);
      dispatch(ResourcesActions.addNewBible('targetLanguage', targetLanguage));
      manifest = ProjectSelectionHelpers.getUSFMProjectManifest(projectPath, projectLink, parsedUSFM, direction, username);
      params = LoadHelpers.getUSFMParams(manifest.ts_project.id, projectPath, manifest.target_language.direction);
    } else {
      manifest = ProjectSelectionHelpers.getProjectManifest(projectPath, projectLink, username);
      if (!manifest) dispatch(AlertModalActions.openAlertDialog("No valid manifest found in project"));
      params = LoadHelpers.getParams(projectPath, manifest);
    }
      dispatch(clearLastProject());
      dispatch(loadProjectDetails(projectPath, manifest, params));
      if (!USFMFilePath) dispatch(TargetLanguageActions.generateTargetBible(projectPath));
      if (LoadHelpers.projectHasMergeConflicts(projectPath, manifest.project.id, USFMFilePath)) dispatch(AlertModalActions.openAlertDialog("Oops! The project you are trying to load has a merge conflict and cannot be opened in this version of translationCore! Please contact Help Desk (help@door43.org) for assistance."));
      if (LoadHelpers.projectIsMissingVerses(projectPath, manifest.project.id)) {
        dispatch(confirmOpenMissingVerseProjectDialog(projectPath, manifest))
      } else {
        dispatch(displayTools(manifest));
      }
  })
}

/**
 * @description - This action creates a confirm dialog that ensures 
 * if the user wants to use a project with missing verses
 * @param {string} projectPath - path location in the filesystem for the project.
 * @param {object} manifest project manifest.
 */
export function confirmOpenMissingVerseProjectDialog(projectPath, manifest) {
  return ((dispatch) => {
    const callback = (option) => {
      if (option != "Cancel") {
        dispatch(displayTools(manifest));
      } else {
        dispatch(clearLastProject());
      }
      return dispatch(AlertModalActions.closeAlertDialog());
    }
    dispatch(AlertModalActions.openOptionDialog(
      "Oops! Your project has blank verses! Please contact Help Desk (help@door43.org) for assistance with fixing this problem. If you proceed without fixing, some features may not work properly",
      callback,
      "Continue Without Fixing",
      "Cancel"
    ));
  })
}

/**
 * @description loads and set the projects details into the projectDetailsReducer.
 * @param {string} projectPath - path location in the filesystem for the project.
 * @param {object} manifest - project manifest.
 */
export function loadProjectDetails(projectPath, manifest, params) {
  return ((dispatch) => {
    LoadHelpers.migrateAppsToDotApps(projectPath);
    dispatch(ProjectDetailsActions.setSaveLocation(projectPath));
    dispatch(ProjectDetailsActions.setProjectManifest(manifest));
    dispatch(ProjectDetailsActions.setProjectDetail("bookName", manifest.project.name));
    dispatch(ProjectDetailsActions.setProjectParams(params));
  });
}

export function clearLastProject() {
  return ((dispatch) => {
    dispatch(BodyUIActions.toggleHomeView(true));
    dispatch(ProjectDetailsActions.resetProjectDetail());
    dispatch({ type: consts.CLEAR_PREVIOUS_GROUPS_DATA });
    dispatch({ type: consts.CLEAR_PREVIOUS_GROUPS_INDEX });
    dispatch({ type: consts.CLEAR_CONTEXT_ID });
    dispatch({ type: consts.CLEAR_CURRENT_TOOL_DATA });
    dispatch({ type: consts.CLEAR_RESOURCES_REDUCER });
    dispatch({
      type: consts.SET_CURRENT_TOOL_TITLE,
      currentToolTitle: ""
    });
  });
}

export function displayTools(manifest) {
  return ((dispatch, getState) => {
    const { currentSettings } = getState().settingsReducer;
    if (LoadHelpers.checkIfValidBetaProject(manifest) || currentSettings.developerMode) {
      dispatch(ToolsMetadataActions.getToolsMetadatas());
      // Go to toolsCards page
      dispatch(BodyUIActions.goToStep(3));
    } else {
      dispatch(AlertModalActions.openAlertDialog('You can only load Ephesians or Titus projects for now.', false));
      dispatch(RecentProjectsActions.getProjectsFromFolder());
      dispatch(clearLastProject())
    }
  });
}