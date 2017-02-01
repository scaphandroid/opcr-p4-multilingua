angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state, $rootScope, $ionicPopup) {

        $rootScope.user = {};
        $scope.loginData = {};

        $scope.signIn = function() {
            // ce login est uniquement pour le prototype
            // il n'utilise pas de mot de passe pour le moment !
            if($scope.loginData.email === 'utilisateur@multilingua.fr' )
            {
                $rootScope.user.id = 'utilisateur';
                $rootScope.user.type = 'utilisateur';
                $state.go('tab.courses');
            }
            else if($scope.loginData.email === 'etudiant@multilingua.fr')
            {
                $rootScope.user.id = 'etudiant';
                $rootScope.user.type = 'etudiant';
                $state.go('tab.courses');
            }
            else
            {
                $ionicPopup.alert({
                    title: 'Erreur !',
                    template: 'Identifiants inconnus !'
                })
            }
        }
    })

    .controller('CoursesCtrl', function($scope, Courses, $ionicPopup) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Courses.get_layout('eng');

        // on récupère la leçon en fonction du language et de la date désiré via le service Courses
        Courses.get('eng', '').success( function (response) {
            $scope.courses = response;
            console.log($scope.courses);
        }).error( function() {
            $ionicPopup.alert({
                title: 'Erreur dans le chargement de la leçon !'
            });
        });

        $scope.audioPlayer = function(src ) {
            console.log('play ' + src);
        }

        //TODO implanter ici la gestion du bouton exercice,
        // il doit charger les exo correspondants à la leçon
        //puis diriger vers la page d'exercice
        $scope.startExercices = function() {

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
        var layout = Contacts.get_layout('eng');
        $scope.layout = layout;

        $scope.showConfirm = function(msg) {
            if(!msg.titre || !msg.contenu ){
                $ionicPopup.alert({
                    title: layout.erreurTitre,
                    template: layout.erreurMsg
                });
            }else{
                $ionicPopup.alert({
                    title: layout.confirmationTitre,
                    template: layout.confirmationMsg
                });
            }
        }
    })

    .controller('ParametersCtrl', function($scope, Parameters) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Parameters.get_layout('eng');
    })

    .controller('ExoCtrl', function($scope) {

        console.log()
    });
