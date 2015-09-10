// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function (comparer) {
    for (var i = 0; i < this.length; i++) {
        if (comparer(this[i])) return true;
    }
    return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function (element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};
var baseThemeURI = '/wp-content/themes/SVPWebsite';
var MyApp = angular.module('MyApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'angular-loading-bar', 'cfp.hotkeys'])
/**
 *
 *    Configure our app
 *
 */
    .config(['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {
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
                templateUrl: baseThemeURI + '/partials/contact.html',
                controller: 'GetPage'
            });

        /**
         *    Remove # from the URL with $locationProvider
         */
        $locationProvider.html5Mode(true).hashPrefix('!');

        cfpLoadingBarProvider.includeSpinner = false;
    }])

/**
 *
 *    On runtime define the page titles for injecting into the page <title> tag
 *
 */

    .controller('MenuController', function ($scope, $location) {
        $scope.isActive = function (route) {
            return route === $location.path();
        };
    })

    .controller('ContactController', function ($scope, $http) {
        $scope.isSaving = undefined;

        $scope.contact = {
            name: '',
            email: '',
            message: ''
        };
        var contactOriginal = angular.copy($scope.contact);

        $scope.submitForm = function (isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                $scope.isSaving = true;

                $http.post('/api/contact/send_message/', $scope.contact).
                    then(function (response) {
                        $scope.isSaving = false;
                        $scope.contact = angular.copy(contactOriginal);
                        $scope.contactForm.$setPristine();
                        if (response.error){
                            alert(response.error);
                        }
                    }, function (response) {
                        $scope.isSaving = false;
                        if (response.error){
                            alert(response.error);
                        }
                    });
            }

        };
    })

/**
 *
 *    Set up a controller called GetPage which is referenced by the
 *    routing set up above. We are passing a URL (using $location.url())
 *    to the API in order to retrieve information for the specific page
 *
 */
    .
    controller('GetPage', function ($scope, $rootScope, $http, $location) {

        /**
         *    Perform a GET request on the API and pass the slug to it using $location.url()
         *    On success, pass the data to the view through $scope.page
         */
        $http.get('/api/get_page/?slug=' + $location.url(), {cache: true})
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

        $http.get('/api/get_category_posts/?slug=featured', {cache: true}).success(function (data) {
            $scope.posts = data;
        });
    })

    .controller('GalleryList', function ($scope, $rootScope, $http, $routeParams, $location, hotkeys) {

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };

        /**
         *  Get posts from a specific category by passing in the slug
         */
        var url;
        $rootScope.title = 'Gallery';
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

                // Inject the title into the rootScope
                // $rootScope.title = data.category.title;

                if ($routeParams.page) {
                    // Get current page
                    $scope.page = $routeParams.page;
                    // Calculate next/previous values
                    $scope.next = parseInt($routeParams.page) + 1;
                    $scope.prev = parseInt($routeParams.page) - 1;
                }
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            });

        hotkeys.bindTo($scope)
            .add({
                combo: 'esc',
                description: 'Remove category filter',
                callback: function () {
                    $scope.changeView('/gallery/');
                }
            });
    })

    .controller('BlogPost', function ($scope, $rootScope, $http, $routeParams, $location, hotkeys) {

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };

        /**
         *  Call the get_post method from the API and pass to it the
         *  value of $routeParams.post, which is actually the post slug
         */
        var url = '/api/get_post/?slug=' + $routeParams.post;
        if ($location.search().preview === 'true') {
            url += '&preview=true&preview_id=' + $location.search().preview_id + '&preview_nonce=' + $location.search().preview_nonce;
        }
        $http.get(url, {cache: true})
            .success(function (data) {
                $scope.post = data;

                // Inject the title into the rootScope
                $rootScope.title = data.post.title;
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            });

        hotkeys.bindTo($scope)
            .add({
                combo: 'left',
                description: 'Navigate to the previous image',
                callback: function () {
                    if ($scope.post.previous_url) {
                        $scope.changeView($scope.post.previous_url.substring($scope.post.previous_url.indexOf('/', 7)));
                    }
                }
            })
            .add({
                combo: 'right',
                description: 'Navigate to the next image',
                callback: function () {
                    if ($scope.post.next_url) {
                        $scope.changeView($scope.post.next_url.substring($scope.post.next_url.indexOf('/', 7)));
                    }
                }
            });
    })

    .controller('CategoryList', function ($scope, $http, $location) {

        $http.get('/api/get_category_index/', {cache: true})
            .success(function (data) {
                $scope.categories = data.categories.filter(function (el) {
                    return el.slug !== "featured";
                });
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            });


        $scope.isCurrent = function (route) {
            var paths = $location.path().split('/');
            return route === paths[paths.length - 2];
        }

    });
