angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {

  $scope.signIn = function() {
  $state.go('tab.courses');
  }
})

.controller('CoursesCtrl', function($scope, Courses) {

  // on récupère la leçon en fonction du language et de la date désirée via le service Courses
  Courses.get('eng', '').success( function (response) {
    $scope.courses = response;
    console.log($scope.courses);
  });

  $scope.audioPlayer = function() {
     console.log('play');
  }
})

.controller('PlanningCtrl', function($scope, Planning) {

  Planning.get('eng').success( function (response) {
    $scope.planning = response;
    console.log($scope.planning);
  });
})

.controller('ContactsCtrl', function($scope) {})

.controller('ParametersCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
