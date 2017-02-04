angular.module('starter.services', [])

    .factory('Courses', function($http) {

        //on trouve ici les termes du layout de cette page pour chaque language
        var layouteng = {
            exerciceButton: 'PRACTICE'
        };

        // TODO prévoir un fallback si pas d'exercice ? ou indiquer de l'implanter sur le serveur ?
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
            titrePage: 'Our next formations'
        };

        //est utilisé ici en local mais pourra être adapté à une api
        return {
            // récupère le planning général pour une langue
            get: function(language){
                return  $http.get('ressources/jsons/planning' + language + '.json');
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


