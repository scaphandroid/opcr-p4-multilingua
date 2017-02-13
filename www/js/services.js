angular.module('starter.services', [])

//gestion de l'utilisateur, de ses préférences et notifications
    .factory('User', function(Planning, $cordovaLocalNotification, $ionicPlatform){

        var user = {};

        return {
            //lors du login
            set_user: function(userConnecter){
                user = userConnecter;
            },
            get_user: function(){
                return user;
            },
            get_user_type: function(){
                return user.type;
            },
            set_user_notification: function(yesorno){
                user.notification = yesorno;
            },
            update_planning_student: function(){
                // on supprime les éventuelles notifications en cours
                cordova.plugins.notification.local.cancelAll();

                //on récupère le planning et on met à jour les notifications
                Planning.get_student(user.id).success(function(response){
                    var formations = response.formations;
                    $ionicPlatform.ready(function() {
                        if(user.notification){
                            for(var i = 0 ; i < formations.length ; i++){
                                var dateFormatee = new Date(formations[i].date.formated);
                                // la notification est prévue une heure avant
                                var dateAlerte = new Date(dateFormatee.getTime() - (3600 * 1000));
                                console.log(dateAlerte);
                                cordova.plugins.notification.local.schedule({
                                    id: i,
                                    title: 'Rappel formation :' + formations[i].titre,
                                    text: formations[i].date.formated + ' au ' + formations[i].lieux.rue + ', '
                                    + formations[i].lieux.code_postal + ', ' + formations[i].lieux.ville,
                                    at: dateAlerte
                                });
                            };
                        }
                    });
                });
            }
        }
    })

    .factory('Courses', function($http) {

        //on trouve ici les termes du layout de cette page pour chaque language
        var layouteng = {
            exerciceButton: 'PRACTICE'
        };

        // prévoir un fallback dans l'api, si pas d'exercice nouveau il faudra renvoyer celui du jour précédent
        //est utilisé ici en local mais pourra être adapté à une api
        return {
            // pour récupérer la leçon du jour en fonction de la date et la langue désirée
            get: function(language, date){
                return  $http.get('ressources/jsons/courses' + language + date + '.json');
            },
            // pour récupérer les éléments de layout en fonction de la langue désirée
            get_layout: function(language){
                if(language = 'eng'){
                    return layouteng;
                }
            },
            // pour récupérer les exercices du jour en fonction de la date et la langue désirée
            get_exercices: function(language, date){
                return $http.get('ressources/jsons/exo' + language + date + '.json');
            }
        };
    })

    .factory('Planning', function($http) {

        //on trouve ici les termes du layout de cette page pour chaque language
        var layouteng = {
            titrePage: 'Our next formations',
            inscription: 'Manage your planning'
        };

        //est utilisé ici en local mais pourra être adapté à une api
        return {
            // récupère le planning général pour une langue
            get: function(language){
                return  $http.get('ressources/jsons/planning' + language + '.json');
            },
            get_student: function(user){
                return $http.get('ressources/jsons/planningStudent' + user + '.json');
            },
            get_layout: function(language){
                if(language = 'eng'){
                    return layouteng;
                }
            }
        };
    })

    .factory('Contacts', function() {

        //on trouve ici les termes du layout de cette page pour chaque language
        var layouteng = {
            titrePageStandart: 'Get in touch with Multilingua',
            titreMessage: 'Message title',
            contenuMessage: 'Your message here',
            envoyerButton: 'SEND',
            erreurTitre: 'Missing informations',
            erreurMsg: 'You message need to have a title and content !',
            confirmationTitre: 'Message send',
            confirmationMsg: 'Thanks we ll get in touch soon !'
        };

        return {
            get_layout: function(language){
                if(language = 'eng'){
                    return layouteng;
                }
            }
        };
    })

    .factory ('Chat', function($http) {

        var layouteng = {
            titrePage: 'Chat with your teacher'
        }


        return {
            get_layout: function(language) {
                if (language = 'eng') {
                    return layouteng;
                }
            },
            get_messages: function(user) {
                return $http.get('ressources/jsons/messages' + user + '.json');
            }
        }
    })

    .factory('Exercices', function(){

        var layouteng = {
            back: 'back to courses',
            exercice: 'Exercice',
            submit: 'Submit',
            juste: 'Correct',
            justeMsg: 'Well done !',
            faux: 'Wrong !',
            reponsejuste: 'Correct answer :'
        }

        return{
            get_layout: function(language){
                if (language= 'eng'){
                    return layouteng;
                }
            }
        }
    })

    .factory('Parameters', function() {

        //on trouve ici les termes du layout de cette page pour chaque language
        var layouteng = {
            titrePage: 'Set up your application',
            language: 'Language',
            notifications: 'Notifications',
            login: 'You are logged as',
            logoutButton: 'LOG OUT'
        };

        return {
            get_layout: function(language) {
                if(language = 'eng'){
                    return layouteng;
                }
            }
        }
    })


