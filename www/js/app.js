// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function($ionicPlatform, $rootScope) {

        //$rootScope.user = { id: 'test', score: 0, active: true};


        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        //la page de login apparait à l'ouverture de l'application
            .state('login', {
                cache: false,
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                cache: false,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack

            .state('tab.courses', {
                url: '/courses',
                views: {
                    'tab-courses': {
                        templateUrl: 'templates/tab-courses.html',
                        controller: 'CoursesCtrl'
                    }
                }
            })

            .state('tab.planning', {
                url: '/planning',
                views: {
                    'tab-planning': {
                        templateUrl: 'templates/tab-planning.html',
                        controller: 'PlanningCtrl'
                    }
                }
            })

            .state('tab.contacts', {
                url: '/contacts',
                views: {
                    'tab-contacts': {
                        templateUrl: 'templates/tab-contacts.html',
                        controller: 'ContactsCtrl'
                    }
                }
            })

            .state('tab.chat', {
                url: '/chat',
                views: {
                    'tab-chat': {
                        templateUrl: 'templates/tab-chat.html',
                        controller: 'ChatCtrl'
                    }
                }
            })

            .state('tab.parameters', {
                url: '/parameters',
                views: {
                    'tab-parameters': {
                        templateUrl: 'templates/tab-parameters.html',
                        controller: 'ParametersCtrl'
                    }
                }
            })

            .state('score', {
                url: '/score/:nbexo:score',
                templateUrl: 'templates/score.html',
                controller: 'ScoreCtrl'
            })

            .state('exercices', {
                cache: false,
                url: '/exercices/:numeroexo:score',
                templateUrl: 'templates/exercices.html',
                controller: 'ExercicesCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');

    });
