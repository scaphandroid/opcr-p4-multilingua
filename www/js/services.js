angular.module('starter.services', [])

.factory('Courses', function($http) {

  //on ne récupère ici que le cours en anglais dans le cadre du prototype
  var coursEN = [];

  $http.get('../ressources/jsons/courseseng.json')
    .then(function(response){
      angular.copy(response.data, coursEN);
    },function(error){
      console.log(error);
  });

  return {
    get: function(language){
      if (language === 'EN') {
        return coursEN;
      }
    }
  };
})

.factory('Audio', function(){

  //on récupère ici la référence du fichier audio
  var audioFile = storage.ref

})

.factory('Planning', function($http) {

  //on ne récupère ici que les formations en anglais, dans le cadre du prototype
  var planningEN = {};

  $http.get('../ressources/jsons/planningen.json')
    .then(function(response){
      angular.copy(response.data, planningEN);
    },function(error){
      console.log(error);
  });

  return {
    get: function(language) {
      if (language === 'EN') {
        return planningEN;
      }
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
