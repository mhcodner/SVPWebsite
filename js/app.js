var baseThemeURI = samvennphotoJS.themeuri;
var MyApp = angular.module('MyApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize'])
/**
 *
 *    Configure our app
 *
 */
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        /**
         *    Configure routes
         */
        $routeProvider
            .when('/', {
                templateUrl: baseThemeURI + '/partials/index.html',
                controller: 'GetIndex'
            })
            .when('/gallery/', {
                templateUrl: baseThemeURI + '/partials/gallery.html',
                controller: 'GalleryList'
            })
            .when('/gallery/category/:category/', {
                templateUrl: baseThemeURI + '/partials/gallery.html',
                controller: 'GalleryList'
            })
            .when('/gallery/:post/', {
                templateUrl: baseThemeURI + '/partials/post.html',
                controller: 'BlogPost'
            })
            .when('/about/', {
                templateUrl: baseThemeURI + '/partials/page.html',
                controller: 'GetPage'
            })
            .when('/contact/', {
                templateUrl: baseThemeURI + '/partials/page.html',
                controller: 'GetPage'
            });

        /**
         *    Remove # from the URL with $locationProvider
         */
        $locationProvider.html5Mode(true).hashPrefix('!');
    }])

/**
 *
 *    On runtime define the page titles for injecting into the page <title> tag
 *
 */

    .controller('MenuController', function ($scope, $location) {
        $scope.isActive = function (route) {
            return route === $location.path();
        }
    })

/**
 *
 *    Set up a controller called GetPage which is referenced by the
 *    routing set up above. We are passing a URL (using $location.url())
 *    to the API in order to retrieve information for the specific page
 *
 */
    .controller('GetPage', function ($scope, $rootScope, $http, $location) {

        /**
         *    Perform a GET request on the API and pass the slug to it using $location.url()
         *    On success, pass the data to the view through $scope.page
         */
        $http.get('/api/get_page/?slug=' + $location.url())
            .success(function (data) {
                $scope.page = data.page;

                // Inject the title into the rootScope
                $rootScope.title = data.page.title;
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            })

    })

    .controller('GetIndex', function ($scope, $rootScope, $http) {
        $rootScope.title = "Sam Venn Photography";

        $http.get('/api/get_posts/').success(function (data) {
            $scope.posts = data;
        });

        $scope.$on('$viewContentLoaded', function ()
        {
            var images = $('.masonry-image');
            images.height(images.width() * 0.75);
        });
    })

    .controller('GalleryList', function ($scope, $rootScope, $http, $routeParams) {

        /**
         *  Get posts from a specific category by passing in the slug
         */
        var url;
        /**
         *  Get the parameter passed into the controller (if it exists)
         *  and then construct the GET URL. If parameter exists, the user
         *  is looking at a specific category.
         */
        if ($routeParams.category) {
            url = $http.get('/api/get_category_posts/?slug=' + $routeParams.category);
        }
        else if ($routeParams.page) {
            /**
             *  If a page parameter has been passed, send this to the API
             */
            url = $http.get('/api/get_posts/?page=' + $routeParams.page);
        }
        else {
            /**
             *  If no parameter supplied, just get all posts
             */
            url = $http.get('/api/get_posts');

            // Set a default paging value
            $scope.page = 1;
            // Set a default next value
            $scope.next = 2;

            // Inject the title into the rootScope
            $rootScope.title = 'Blog';
        }
        url
            .success(function (data) {
                /**
                 *  Pass data from the feed to the view.
                 *  $scope.posts will pass exclusively post data
                 *  $scope.paging will pass the whole feed and will be used to work out paging
                 */
                $scope.posts = data.posts;
                $scope.paging = data;
                //console.log(data);

                // Inject the title into the rootScope
                // $rootScope.title = data.category.title;

                if ($routeParams.page) {
                    // Get current page
                    $scope.page = $routeParams.page;
                    // Caluculate next/previous values
                    $scope.next = parseInt($routeParams.page) + 1;
                    $scope.prev = parseInt($routeParams.page) - 1;
                }
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            })

    })

    .controller('BlogPost', function ($scope, $rootScope, $http, $routeParams) {

        /**
         *  Call the get_post method from the API and pass to it the
         *  value of $routeParams.post, which is actually the post slug
         */
        $http.get('/api/get_post/?slug=' + $routeParams.post)
            .success(function (data) {
                $scope.post = data;

                // Inject the title into the rootScope
                $rootScope.title = data.post.title;
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            })

    })

    .controller('CategoryList', function ($scope, $http) {

        /**
         *  This method just gets the categories available to us and
         *  makes them available through CategoryList controller
         */
        $http.get('/api/get_category_index/')
            .success(function (data) {
                $scope.categories = data.categories;
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            })

    });
