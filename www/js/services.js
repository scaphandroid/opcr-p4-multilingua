angular.module('starter.services', [])

.factory('Courses', function() {

  //TODO le contenu des cours sera à déplacer dans un stockage dédié

  var coursEN = '{"titre": "Lesson", "audioURL": "", "imgURL": "", "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae pulvinar elit, sed pharetra felis. Donec sollicitudin odio ut elit convallis cursus. Sed scelerisque lacus at tellus accumsan, id facilisis mi porta. Curabitur molestie id magna ac iaculis. Aenean vulputate facilisis sollicitudin. Cras porttitor dolor vel ligula tempus fermentum. Suspendisse efficitur arcu et mauris lacinia interdum. Nullam congue mi nisi, a interdum velit molestie at. In tristique lorem lorem, ac feugiat nunc faucibus in. Sed quis sagittis enim. Suspendisse risus quam, iaculis at pulvinar ac, congue et leo. Maecenas sodales metus at felis sagittis molestie. In sit amet cursus dui, non lobortis justo. Phasellus accumsan tellus id ultrices tempor. Donec sagittis nisl quis nisi aliquam luctus. Pellentesque vitae nisi lacus. " }';
  var coursESP = '{"titre": "LessonESP", "audioURL": "", "imgURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/langfr-225px-Flag_of_Spain.svg.png", "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae pulvinar elit, sed pharetra felis. Donec sollicitudin odio ut elit convallis cursus. Sed scelerisque lacus at tellus accumsan, id facilisis mi porta. Curabitur molestie id magna ac iaculis. Aenean vulputate facilisis sollicitudin. Cras porttitor dolor vel ligula tempus fermentum. Suspendisse efficitur arcu et mauris lacinia interdum. Nullam congue mi nisi, a interdum velit molestie at. In tristique lorem lorem, ac feugiat nunc faucibus in. Sed quis sagittis enim. Suspendisse risus quam, iaculis at pulvinar ac, congue et leo. Maecenas sodales metus at felis sagittis molestie. In sit amet cursus dui, non lobortis justo. Phasellus accumsan tellus id ultrices tempor. Donec sagittis nisl quis nisi aliquam luctus. Pellentesque vitae nisi lacus. " }'
  var coursDEU = '{"titre": "LessonDEU", "audioURL": "", "imgURL": "", "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae pulvinar elit, sed pharetra felis. Donec sollicitudin odio ut elit convallis cursus. Sed scelerisque lacus at tellus accumsan, id facilisis mi porta. Curabitur molestie id magna ac iaculis. Aenean vulputate facilisis sollicitudin. Cras porttitor dolor vel ligula tempus fermentum. Suspendisse efficitur arcu et mauris lacinia interdum. Nullam congue mi nisi, a interdum velit molestie at. In tristique lorem lorem, ac feugiat nunc faucibus in. Sed quis sagittis enim. Suspendisse risus quam, iaculis at pulvinar ac, congue et leo. Maecenas sodales metus at felis sagittis molestie. In sit amet cursus dui, non lobortis justo. Phasellus accumsan tellus id ultrices tempor. Donec sagittis nisl quis nisi aliquam luctus. Pellentesque vitae nisi lacus. " }';
  var coursPORT = '{"titre": "LessonPORT", "audioURL": "", "imgURL": "", "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae pulvinar elit, sed pharetra felis. Donec sollicitudin odio ut elit convallis cursus. Sed scelerisque lacus at tellus accumsan, id facilisis mi porta. Curabitur molestie id magna ac iaculis. Aenean vulputate facilisis sollicitudin. Cras porttitor dolor vel ligula tempus fermentum. Suspendisse efficitur arcu et mauris lacinia interdum. Nullam congue mi nisi, a interdum velit molestie at. In tristique lorem lorem, ac feugiat nunc faucibus in. Sed quis sagittis enim. Suspendisse risus quam, iaculis at pulvinar ac, congue et leo. Maecenas sodales metus at felis sagittis molestie. In sit amet cursus dui, non lobortis justo. Phasellus accumsan tellus id ultrices tempor. Donec sagittis nisl quis nisi aliquam luctus. Pellentesque vitae nisi lacus. " }';

  return {
    get: function(language){
      if (language === 'ESP'){
        return JSON.parse(coursESP);
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
