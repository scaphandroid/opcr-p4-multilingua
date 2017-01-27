angular.module('starter.services', [])

.factory('Courses', function($http) {

  //on ne récupère ici que le cours en anglais dans le cadre du prototype
  var coursEN = [];
  $http.get('../ressources/jsons/courseseng.json')
    .then(function(response){
        angular.copy(response.data, coursEN);
    },function(error){
        $log.error(error);
  });

  return {
    get: function(language){
      if (language === 'ESP'){
        return coursESP;
      }
      if (language === 'EN'){
        return coursEN;
      }
      if (language === 'DEU'){
        return coursDEU;
      }
      if (language === 'PORT'){
        return coursPORT;
      }
    }
  };
})

.factory('Planning', function() {

  var planning = '{ 	"formations": [ 		{"titre": "first"}, 		{ 			"lieux": 				[ 					{"ville": "Paris"}, 					{"rue": "12 rue Henri Lemoine"}, 					{"code_postal": "75013"} 				] 		}, 		{ 			"date": 				[ 					{"jour": "12"}, 					{"mois": "fevrier"}, 					{"annee": "2017"}, 					{"heure": "12"}, 					{"minutes": "30"} 				] 		}, 		{"url": ""} 	] }';

  return {
    get: function() {
      return JSON.parse(planning);
    }
  }
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
