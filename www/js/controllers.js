angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state) {

        //TODO traiter les données d'identification
        $scope.signIn = function() {
            $state.go('tab.courses');
        }
    })

    .controller('CoursesCtrl', function($scope, Courses) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Courses.get_layout('eng');

        // on récupère la leçon en fonction du language et de la date désiré via le service Courses
        Courses.get('eng', '').success( function (response) {
            $scope.courses = response;
            console.log($scope.courses);
        });

        $scope.audioPlayer = function(src ) {
            console.log('play ' + src);
        }
    })

    .controller('PlanningCtrl', function($scope, Planning) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Planning.get_layout('eng');

        // on récupère le planning en fonction du language désiré via le service Planning
        Planning.get('eng').success( function (response) {
            $scope.planning = response;
            console.log($scope.planning);
        });
    })

    .controller('ContactsCtrl', function($scope, Contacts, $ionicPopup) {

        $scope.msg = {};

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Contacts.get_layout('eng');

        $scope.showConfirm = function(msg) {
            console.log(msg);
            if(!msg.titre || !msg.contenu ){
                var errorPopup = $ionicPopup.alert({
                    title: 'Missing informations',
                    template: 'You message need to have a title and content !'
                });
            }else{
                var confirmPopup = $ionicPopup.alert({
                    title: 'Message send',
                    template: 'Thanks we ll get in touch soon !'
                });
            }
        }
    })

    .controller('ParametersCtrl', function($scope, Parameters) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Parameters.get_layout('eng');
    });
