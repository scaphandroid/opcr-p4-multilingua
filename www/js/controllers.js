angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {

  $scope.signIn = function() {
  $state.go('tab.courses');
  }
})

.controller('CoursesCtrl', function($scope, Courses) {

  $scope.courses = Courses.get('EN');
  console.log($scope.courses);
})

.controller('PlanningCtrl', function($scope, Planning) {

  $scope.planning = Planning.get();
  console.log($scope.planning);
})

.controller('ContactsCtrl', function($scope) {})

.controller('ParametersCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
