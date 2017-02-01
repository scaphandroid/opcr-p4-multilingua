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

    .controller('CoursesCtrl', function($scope, Courses, $ionicPopup, $rootScope, $state) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Courses.get_layout('eng');

        // on récupère la leçon en fonction du language et de la date désiré via le service Courses
        Courses.get('eng', '').success( function (response) {
            $scope.courses = response;
        }).error( function() {
            console.log(error);
            $ionicPopup.alert({
                title: 'Erreur dans le chargement de la leçon !'
            });
        });

        $scope.audioPlayer = function(src ) {
            console.log('play ' + src);
        }

        $scope.startExercices = function() {
            // on charge les données d'exercice
            // et on redirige vers la page d'exercice
            Courses.get_exercices('eng', '').success( function (response) {
                $rootScope.exercices = response.exercices;
                $state.go('exercices', {'numeroexo': 0});
            }).error( function(error) {
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erreur dans le chargement des exercices !'
                });
            });
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

    .controller('ExercicesCtrl', function($scope, $rootScope, $stateParams, $state) {

        //TODO il faudra prévoir le chargement du layout pour la langue

        // on récupère les données des exercices et le numéro d'exercice en cours
        var numeroexo = parseInt($stateParams.numeroexo);
        var exercices = $rootScope.exercices;
        console.log(numeroexo);

        if( numeroexo < exercices.nbexercices){
            $scope.exo = exercices.exo[$stateParams.numeroexo];
            $scope.numeroexo = numeroexo+1;
        }else{
            //TODO retourner au cours avec une erreur
        }

        //lors du submit, soit on recharge la page d'exerices au numéro suivant
        //soit, si on est au dernier exercice, on passe au score
        $scope.submit = function() {

            //TODO on controlera ici la réponse, affichage d'un pop et mise à jour du score

            if( (numeroexo+1) < exercices.nbexercices ){
                $state.go('exercices', {'numeroexo': numeroexo+1});
            }
        }
    });
