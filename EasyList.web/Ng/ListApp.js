var listModule = angular.module('listModule', ['LocalStorageModule'])
.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('EasyList');
    // localStorageServiceProvider.setStorageCookieDomain('example.com');
    // localStorageServiceProvider.setStorageType('sessionStorage');
}])
.controller('listController', [
  '$scope',
  'localStorageService',
  function ($scope, localStorageService) {


      $scope.storageType = 'Local storage';

      if (localStorageService.getStorageType().indexOf('session') >= 0) {
          $scope.storageType = 'Session storage';
      }

      if (!localStorageService.isSupported) {
          $scope.storageType = 'Cookie';
      }

      //-----------------------------------

      // DEFAULTS
      var defaultList = {
          name: 'Easy List',
          items: [{ text: 'Visit Easy List', done: true },
                  { text: 'Sign Up', done: false },
                  { text: 'Make Lists', done: false }]
      };

      // Array of local lists
      $scope.lists = [];

      // Display List
      $scope.list = {};

      var localLists = localStorageService.get('localLists');
      if (localLists != null && localLists.length > 0) {
          $scope.lists = localLists;
      } else {
          // no lists yet, push the default one.
          $scope.lists.push(defaultList)
          //$scope.saveLists();
      }

      $scope.list = $scope.lists[0];

      $scope.listToJson = function () {
          return angular.toJson($scope.list);
      }


      // ADD new item to the main list
      $scope.addListItem = function () {
          $scope.list.items.push({ text: $scope.listItemText, done: false });
          $scope.listItemText = '';
          //$scope.saveLists();
      };

      // REMOVE Item from main list.
      $scope.removeListItem = function (listItem) {
          var index = $scope.list.items.indexOf(listItem)
          $scope.list.items.splice(index, 1);
      }

      // Edit List Name
      $scope.updateListName = function () { $scope.list.name = $scope.newName; }
      $scope.copyListName = function () { $scope.newName = $scope.list.name; }

      // Add a new list
      $scope.newList = function () {
          var tempName = "New List " + $scope.lists.length
          $scope.lists.push({ name: tempName, items: [] })
      }

      // Change main list
      $scope.changeList = function (list) {
          $scope.list = list;
          // Slide up the list if below 991 px, where we change to mobile menu.
          if (Modernizr.mq('(max-width: 991px)')) { $('#localList').slideUp(); }
      }

      // Counts
      $scope.totalItems = function () {
          return $scope.items ? $scope.items.length : 0;
      };

      $scope.complete = function () {
          var count = 0;
          angular.forEach($scope.list.items, function (listItem) {
              count += listItem.done ? 1 : 0;
          });
          return count;
      };

      $scope.incomplete = function () {
          var count = 0;
          angular.forEach($scope.list.items, function (listItem) {
              count += listItem.done ? 0 : 1;
          });
          return count;
      };

      // List Filters
      $scope.filterFunction = null;

      $scope.filterComplete = function () {
          $scope.filterFunction = function (listItem) { return listItem.done; };
      }

      $scope.filterIncomplete = function () {
          $scope.filterFunction = function (listItem) { return !listItem.done; };
      }

      // Tools 
      $scope.completeAll = function () {
          angular.forEach($scope.list.items, function (listItem) {
              listItem.done = true;
          });
      };

      $scope.incompleteAll = function () {
          angular.forEach($scope.list.items, function (listItem) {
              listItem.done = false;
          });
      };

      $scope.clearList = function () {
          $scope.list.items = [];
      };

      $scope.deleteList = function () {
          var index = $scope.lists.indexOf($scope.list)
          $scope.lists.splice(index, 1);

          if ($scope.lists.length > 0) {
              $scope.list = $scope.lists[0];
          }
      };


      // Watch the lists object for changes!
      $scope.$watch('lists', function (value) {
          $scope.saveLists();
      }, true);


      // Save List to local memory.
      $scope.saveLists = function () {
          localStorageService.set('localLists', $scope.lists);
      }
  }
]);