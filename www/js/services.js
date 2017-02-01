angular.module('starter.services', [])

    .factory('Courses', function($http) {

        //on trouve ici les termes du layout de cette page pour chaque language
        var layouteng = {
            exerciceButton: 'PRACTICE'
        };

        //est utilisé ici en local mais pourra être adapté à une api
        return {
            // pour récupérer la leçon du jour en fonction de la date et la langue désirée
            get: function(language, date){
                return  $http.get('../ressources/jsons/courses' + language + date + '.json');
            },
            // pour récupérer les éléments de layout en fonction de la langue désirée
            get_layout: function(language) {
                if(language = 'eng'){
                    return layouteng;
                }
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
                return  $http.get('../ressources/jsons/planning' + language + '.json');
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
            envoyerButton: 'SEND'
        }

        return {
            get_layout: function(language){
                if(language = 'eng'){
                    return layouteng;
                }
            }
        };
    })

    .factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });

