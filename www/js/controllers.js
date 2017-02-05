angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state, $rootScope, $ionicPopup) {

        $rootScope.user = {
            id: '',
            type: '',
            active: true
        };

        $scope.loginData = {};

        $scope.signIn = function() {
            // ce login est uniquement pour le prototype
            // il n'utilise pas de mot de passe pour le moment !
            if($scope.loginData.email === 'utilisateur@multilingua.fr' )
            {
                $rootScope.user.id = 'utilisateur';
                $rootScope.user.type = 'utilisateur';
                $rootScope.user.active = true;
                $state.go('tab.courses');
            }
            else if($scope.loginData.email === 'etudiant@multilingua.fr')
            {
                $rootScope.user.id = 'etudiant';
                $rootScope.user.type = 'etudiant';
                $rootScope.user.active = true;
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

    .controller('CoursesCtrl', function($scope, Courses, $ionicPopup, $rootScope, $state, $cordovaMedia, $ionicPlatform) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Courses.get_layout('eng');

        // on récupère la leçon en fonction du language et de la date désiré via le service Courses
        Courses.get('eng', '').success( function (response) {
            $scope.courses = response;
            // préparation de l'audio
            var media = new Media($scope.courses.audioURL);
            console.log(media);
            var playing = false;
            //gestion de l'audio
            $scope.audioPlayer = function(src) {
                if(!playing){
                    media.play();
                    playing = true;
                }else{
                    media.pause();
                }
            };
        }).error( function() {
            console.log(error);
            $ionicPopup.alert({
                title: 'Erreur dans le chargement de la leçon !'
            });
        });

        $scope.startExercices = function() {
            // on charge les données d'exercice
            // et on redirige vers la page d'exercice
            Courses.get_exercices('eng', '').success( function (response) {
                $rootScope.exercices = response.exercices;
                $state.go('exercices', {'numeroexo': 0, 'score': 0});
            }).error( function(error) {
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erreur dans le chargement des exercices !'
                });
            });
        }
    })

    .controller('PlanningCtrl', function($scope, Planning, $rootScope, $ionicPopup) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Planning.get_layout('eng')

        //si il l'utilisateur est un étudiant on récupère le planning personnalisé de l'étudiant
        if($rootScope.user.type === 'etudiant'){
            Planning.get_student($rootScope.user.id).success( function (response) {
                $scope.planning = response;
            }).error( function(error) {
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erreur dans le chargement de votre planning !'
                });
            })
        }
        // sinon on récupère le planning général en fonction du language désiré via le service Planning
        else{
            Planning.get('eng').success( function (response) {
                $scope.planning = response;
            }).error( function(error) {
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erreur dans le chargement du planning !'
                });
            })
        }
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
                //TODO si le message est envoyé il faudra également penser à vider les inputs
            }
        }
    })

    .controller('ChatCtrl', function(Chat, $scope, $rootScope, $ionicScrollDelegate){

        $scope.data = {};

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Chat.get_layout('eng');

        Chat.get_messages($rootScope.user.id).success( function (response) {
            $scope.conversation = response;
            console.log($scope.conversation);
        });

        // on scroll jusqu'au dernier message au chargement et on affiche la barre d'édition
        $scope.scrollBottom = function(){
            $ionicScrollDelegate.scrollBottom();
            return true;
        }

        $scope.send = function(message){
            //on n'envoie pas de message vide
            if(message){
                var d = new Date();
                dformat = d.toLocaleDateString().replace(/:\d+ /, ' ');
                tformat = d.toLocaleTimeString().replace(/:\d+ /, ' ');
                var nouveauMsg = {
                    content: message,
                    user: $rootScope.user.id,
                    datetime: dformat + ' ' + tformat
                };
                $scope.conversation.messages.push(nouveauMsg);
                $scope.data = {};
                $ionicScrollDelegate.scrollBottom();
            }
        }
    })

    .controller('ParametersCtrl', function($scope, Parameters, $state) {

        // on récupère les éléments du layout qui dépendent de la langue
        $scope.layout = Parameters.get_layout('eng');

        $scope.languageparam = 'English';

        $scope.goLogOut = function(){
            $state.go('login');
        }
    })

    .controller('ExercicesCtrl', function($scope, $rootScope, $stateParams, $state, $ionicPopup, $ionicPlatform) {

        //TODO il faudra prévoir le chargement du layout pour la langue

        $ionicPlatform.onHardwareBackButton(function() {
            event.preventDefault();
            event.stopPropagation();
            alert('going back');
        });

        // on récupère les données des exercices, le score et le numéro d'exercice en cours
        var numeroexo = parseInt($stateParams.numeroexo);
        var score = parseInt($stateParams.score);
        console.log(score);
        var exercices = $rootScope.exercices;

        // stockera la réponse de l'utilisateur
        $scope.reponse = {};

        if( numeroexo < exercices.nbexercices){
            $scope.exo = exercices.exo[$stateParams.numeroexo];
            $scope.numeroexo = numeroexo+1;
        }else{
            //TODO retourner au cours avec une erreur
        }

        //lors du submit, soit on recharge la page d'exerices au numéro suivant
        //soit, si on est au dernier exercice, on passe au score
        $scope.submit = function() {

            var reponsejuste = false;
            var reponseaindiquer = '';

            if ($scope.exo.type === 'choix multiples'){
                var nbCaseCochees = 0;
                for(reponseCochee in $scope.reponse){
                    var correct = false;
                    nbCaseCochees ++;
                    for(reponsePossible in $scope.exo.reponses){
                        if(reponseCochee === $scope.exo.choix[reponsePossible]){
                            correct = true;
                        }
                    }
                    reponsejuste = correct;
                }
                //on vérifie que le nombre de caches cochées correspond au nombre attendu
                if( nbCaseCochees !== Object.keys($scope.exo.reponses).length ){
                    reponsejuste = false;
                }
                if(reponsejuste){
                    score ++;
                }else{
                    for(reponsePossible in $scope.exo.reponses){
                        reponseaindiquer+= $scope.exo.choix[reponsePossible] + '<br>';
                    }
                }
            }

            if ($scope.exo.type === 'phrase'){
                //TODO éventuellement le rendre insensible à la casse ?
                if($scope.reponse.texte === $scope.exo.reponse){
                    reponsejuste = true;
                    score ++;
                }else{
                    reponseaindiquer = $scope.exo.reponse;
                }
            }

            if ($scope.exo.type === 'choix simple'){
                if($scope.reponse.choix === $scope.exo.choix[$scope.exo.reponse-1]){
                    reponsejuste = true;
                    score ++;
                }else{
                    reponseaindiquer = $scope.exo.choix[$scope.exo.reponse-1];
                }
            }

            var titrePopUp = '';
            var msgPopUp = '';

            if(reponsejuste){
                titrePopUp = 'Bravo !';
                msgPopUp = 'Réponse juste !';
            }else{
                titrePopUp = 'Raté !';
                msgPopUp = 'Ce qui était juste :<br>' +  reponseaindiquer ;
            }

            var popUp = $ionicPopup.alert({
                title: titrePopUp,
                template: msgPopUp
            });

            popUp.then(function(res){
                if( (numeroexo+1) < exercices.nbexercices ) {
                    $state.go('exercices', {'numeroexo': numeroexo + 1, 'score': score});
                } else{
                    $state.go('score', {'nbexo': exercices.nbexercices, 'score': score})
                }
            })
        }
    })

    .controller('ScoreCtrl', function($stateParams, $state, $scope){

        $scope.score = parseInt($stateParams.score);
        $scope.nbexo = parseInt($stateParams.nbexo);
    });
