var baseThemeURI = themeSettings.themeUri;
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
            .when('/gallery/page/:page/', {
                templateUrl: baseThemeURI + '/partials/gallery.html',
                controller: 'GalleryList'
            })
            .when('/gallery/category/:category/', {
                templateUrl: baseThemeURI + '/partials/gallery.html',
                controller: 'GalleryList'
            })
            .when('/gallery/category/:category/page/:page/', {
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
            })
            .otherwise({
                templateUrl: baseThemeURI + '/partials/404.html',
                controller: '404'
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

    .controller('404', function ($rootScope) {
        $rootScope.title = '404 - Page not found - Sam Venn Photography';
    })

    .controller('MenuController', function ($scope, $location, $http) {
        $scope.isActive = function (route) {
            return route.replace(themeSettings.siteURL, '') === $location.path();
        };

        $http.get('/api/menu/get_menu/').
            then(function (response) {
                $scope.menuItems = response.data.menuItems;
                if (response.error) {
                    console.log(response.error);
                }
            }, function (response) {
                if (response.error) {
                    console.log(response.error);
                }
            });

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
                        if (response.error) {
                            alert(response.error);
                        }
                    }, function (response) {
                        $scope.isSaving = false;
                        if (response.error) {
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
    .controller('GetPage', function ($scope, $rootScope, $http, $location, $window) {

        $scope.$on('$viewContentLoaded', function (event) {
            $window.ga('send', 'pageview', {page: $location.url()})
        });

        /**
         *    Perform a GET request on the API and pass the slug to it using $location.url()
         *    On success, pass the data to the view through $scope.page
         */
        $http.get('/api/get_page/?slug=' + $location.url(), {cache: true})
            .success(function (data) {
                $scope.page = data.page;

                // Inject the title into the rootScope
                $rootScope.title = data.page.title + ' - Sam Venn Photography';
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            })

    })

    .controller('GetIndex', function ($scope, $rootScope, $http, $window, $location) {

        $scope.$on('$viewContentLoaded', function (event) {
            $window.ga('send', 'pageview', {page: $location.url()})
        });

        $rootScope.title = "Sam Venn Photography";

        $scope.defaultThumb = baseThemeURI + '/img/default-thumb.jpg';

        $http.get('/api/get_posts/?category_name=featured&posts_per_page=12', {cache: true}).success(function (data) {
            $scope.posts = data;
        });
    })

    .controller('GalleryList', function ($scope, $rootScope, $http, $routeParams, $location, hotkeys, $window) {

        $scope.$on('$viewContentLoaded', function (event) {
            $window.ga('send', 'pageview', {page: $location.url()})
        });

        $scope.defaultThumb = baseThemeURI + '/img/default-thumb.jpg';

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };

        /**
         *  Get posts from a specific category by passing in the slug
         */
        var url = '/api/get_posts?posts_per_page=12';
        $rootScope.title = 'Gallery - Sam Venn Photography';
        /**
         *  Get the parameter passed into the controller (if it exists)
         *  and then construct the GET URL. If parameter exists, the user
         *  is looking at a specific category.
         */
        if ($routeParams.category) {
            url += '&category_name=' + $routeParams.category;
        }
        if ($routeParams.page) {
            /**
             *  If a page parameter has been passed, send this to the API
             */
            url += '&page=' + $routeParams.page;
        }

        // Set a default paging value
        $scope.page = 1;
        // Set a default next value
        $scope.next = 2;
        $http.get(url)
            .success(function (data) {
                /**
                 *  Pass data from the feed to the view.
                 *  $scope.posts will pass exclusively post data
                 *  $scope.paging will pass the whole feed and will be used to work out paging
                 */
                $scope.posts = data.posts;
                $scope.paging = data;

                if ($routeParams.page) {
                    // Get current page
                    $scope.page = $routeParams.page;
                    // Calculate next/previous values
                    $scope.next = parseInt($routeParams.page) + 1;
                    $scope.prev = parseInt($routeParams.page) - 1;
                }

                if ($routeParams.category) {
                    $scope.nextLink = '/gallery/category/' + $routeParams.category + '/page/' + $scope.next;
                    $scope.prevLink = '/gallery/category/' + $routeParams.category + '/page/' + $scope.prev;
                }
                else {
                    $scope.nextLink = '/gallery/page/' + $scope.next;
                    $scope.prevLink = '/gallery/page/' + $scope.prev;
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
            })
            .add({
                combo: 'left',
                description: 'Navigate to previous page',
                callback: function () {
                    if ($scope.prevLink) {
                        $scope.changeView($scope.prevLink);
                    }
                }
            })
            .add({
                combo: 'right',
                description: 'Navigate to next page',
                callback: function () {
                    if ($scope.nextLink) {
                        $scope.changeView($scope.nextLink);
                    }
                }
            });
    })

    .controller('BlogPost', function ($scope, $rootScope, $http, $routeParams, $location, hotkeys, $window) {

        $scope.$on('$viewContentLoaded', function (event) {
            $window.ga('send', 'pageview', {page: $location.url()});
        });

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };

        $scope.escape = function() {
            $scope.changeView('/gallery/category/' + $scope.category.slug);
        };

        $scope.previous = function() {
            if ($scope.post.previous_url) {
                $scope.changeView($scope.post.previous_url.substring($scope.post.previous_url.indexOf('/', 7)));
            }
        };

        $scope.next = function() {
            if ($scope.post.next_url) {
                $scope.changeView($scope.post.next_url.substring($scope.post.next_url.indexOf('/', 7)));
            }
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

                $scope.category = (data.post.categories[0].slug === 'featured') ? data.post.categories[1] : data.post.categories[0];

                // Inject the title into the rootScope
                $rootScope.title = data.post.title + ' - Sam Venn Photography';
            })
            .error(function () {
                window.alert("We have been unable to access the feed :-(");
            });

        hotkeys.bindTo($scope)
            .add({
                combo: 'esc',
                description: 'Navigate to the category listing',
                callback: function () {
                    $scope.escape();
                }
            })
            .add({
                combo: 'left',
                description: 'Navigate to the previous image',
                callback: function () {
                    $scope.previous();
                }
            })
            .add({
                combo: 'right',
                description: 'Navigate to the next image',
                callback: function () {
                    $scope.next();
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
