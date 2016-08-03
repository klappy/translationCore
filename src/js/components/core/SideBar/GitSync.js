const git = require('../GitApi.js');
const api = window.ModuleApi;
const CoreActions = require('../../../actions/CoreActions.js');
const CoreStore = require('../../../stores/CoreStore.js');
const pathFinder = require('path');
const path = api.getDataFromCommon('saveLocation');
const user = CoreStore.getLoggedInUser();
const gogs = require('../login/GogsApi.js');
const toast = require('../../../NotificationApi/ToastApi.js');

function syncToGit() {
  if (user) {
    git(path).save('Updating with Door43', path, function() {
        var manifest = api.getDataFromCommon('tcManifest');
        if (manifest.repo) {
          var urlArray = manifest.repo.split('.');
          urlArray.pop();
          var finalPath = urlArray.join('.').split('/');
          var repoName = finalPath.pop();
          var userName = finalPath.pop();
          var repoPath = userName + '/' + repoName;
          var remote = 'https://' + user.token + '@git.door43.org/' + repoPath + '.git';
          git(path).update(remote, 'master', false, function(err){
            if (err) {
              var Confirm = {
                title: 'You don\'t have permission to push to this repository.',
                content: "Would you like to create a new Door43 project?",
                leftButtonText: "No",
                rightButtonText: "Yes"
              }
              api.createAlert(Confirm, function(result){
                if(result == 'Yes') {
                  const projectName = repoPath;
                  gogs(user.token).createRepo(user, projectName).then(function(repo) {
                    var newRemote = 'https://' + user.token + '@git.door43.org/' + repo.full_name + '.git';
                    var remoteLink = 'https://git.door43.org/' + repo.full_name + '.git';
                    api.updateManifest('repo', remoteLink);
                    git(path).update(newRemote, 'master', true, function(){});
                  });
                }
              });
            } else {
              toast.success('Update succesful', '', 3);
            }
          });
        } else {
              var Create = {
                title: 'There is no associated repository with this project.',
                content: "Would you like to create a new Door43 project?",
                leftButtonText: "No",
                rightButtonText: "Yes"
              }
              api.createAlert(Create, function(result){
                if(result == 'Yes') {
                  const projectName = path.split(pathFinder.sep);
                  var nameOfProject = projectName.pop();
                  nameOfProject = nameOfProject.replace(/[^A-Za-z-_]/g, '-')
                  var repoPath = user.username + '/' + nameOfProject;
                  var remote = 'https://' + user.token + '@git.door43.org/' + repoPath + '.git';
                  var remoteLink = 'https://git.door43.org/' + repoPath + '.git';
                  api.updateManifest('repo', remoteLink);
                  git(path).update(remote, 'master', true, function(err){
                    if (err) {
                      gogs(user.token).createRepo(user, nameOfProject).then(function(repo) {
                        var newRemote = 'https://' + user.token + '@git.door43.org/' + repo.full_name + '.git';
                        remoteLink = 'https://git.door43.org/' + repo.full_name + '.git';
                        api.updateManifest('repo', remoteLink);
                        git(path).update(newRemote, 'master', true, function(){
                          toast.success('Update succesful', '', 3);
                        });
                      });
                    } else {
                      toast.success('Update succesful', '', 3);
                    }
                  });
                }
              });
        }
    });
  } else {
    toast.info('Login then try again', '', 3);
    CoreActions.updateLoginModal(true);
  }
}

module.exports = syncToGit;
