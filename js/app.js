var baseThemeURI = themeSettings.themeUri;
function arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
        if(angular.equals(arr[i], obj)){
            return i;
        }
    }
    return -1;
}
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
            .when('/contact/', {
                templateUrl: baseThemeURI + '/partials/contact.html',
                controller: 'GetPage'
            })
            .when('/:page/', {
                templateUrl: baseThemeURI + '/partials/page.html',
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
        $rootScope.title = '404 - Page not found';
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
            //$window.ga('send', 'pageview', {page: $location.url()});
        });

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
                console.log("We have been unable to access the feed :-(");
            })

    })

    .controller('GetIndex', function ($scope, $rootScope, $http, $window, $location, hotkeys) {

        $scope.$on('$viewContentLoaded', function (event) {
            //$window.ga('send', 'pageview', {page: $location.url()});
        });

        $rootScope.title = themeSettings.siteTitle;

        $scope.defaultThumb = baseThemeURI + '/img/default-thumb.jpg';

        $scope.siteTagLine = themeSettings.siteTagLine;

        $scope.setWidth = function(post){
            var height = $(window).width() > 992 ? themeSettings.carouselHeight[0] : themeSettings.carouselHeight[1];
            width = (post.thumbnail_images.medium.width / post.thumbnail_images.medium.height) * height;
            return { width: Math.round(width) + 'px' };
        };

        $http.get('/api/get_posts/?category_name=featured&posts_per_page=12', {cache: true}).success(function (data) {
            $scope.posts = data;
        });

        hotkeys.bindTo($scope)
            .add({
                combo: 'left',
                description: 'Previous image',
                callback: function() {
                    $('.owl-carousel').trigger('prev.owl.carousel');
                }
            })
            .add({
                combo: 'right',
                description: 'Next image',
                callback: function() {
                    $('.owl-carousel').trigger('next.owl.carousel');
                }
            });
    })

    .controller('GalleryList', function ($scope, $rootScope, $http, $routeParams, $location, hotkeys, $window) {

        $scope.$on('$viewContentLoaded', function (event) {
            //$window.ga('send', 'pageview', {page: $location.url()});
        });

        $scope.defaultThumb = baseThemeURI + '/img/default-thumb.jpg';

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };

        $scope.slideTo = function (index) {
            gallerySlideTo(index);
        };

        /**
         *  Get posts from a specific category by passing in the slug
         */
        var url = '/api/get_posts?posts_per_page=-1';
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
        $http.get(url, {cache: true})
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
                    $http.get('/api/get_category_posts/?slug=' + $routeParams.category, {cache: true}).success(function(data) {
                        $rootScope.title = data.category.title;
                    });
                    $scope.nextLink = '/gallery/category/' + $routeParams.category + '/page/' + $scope.next;
                    $scope.prevLink = '/gallery/category/' + $routeParams.category + '/page/' + $scope.prev;
                }
                else {
                    $rootScope.title = 'Gallery';
                    $scope.nextLink = '/gallery/page/' + $scope.next;
                    $scope.prevLink = '/gallery/page/' + $scope.prev;
                }
            })
            .error(function () {
                console.log("We have been unable to access the feed :-(");
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
                description: 'Previous image',
                callback: function() {
                    $('.owl-carousel').trigger('prev.owl.carousel');
                }
            })
            .add({
                combo: 'right',
                description: 'Next image',
                callback: function() {
                    $('.owl-carousel').trigger('next.owl.carousel');
                }
            });
    })

    .controller('BlogPost', function ($scope, $rootScope, $http, $routeParams, $location, hotkeys, $window) {

        $scope.$on('$viewContentLoaded', function (event) {
            //$window.ga('send', 'pageview', {page: $location.url()});
        });

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };

        $scope.escape = function () {
            $scope.changeView('/gallery/category/' + $scope.category.slug);
        };

        $scope.previous = function () {
            if ($scope.previous_slug) {
                $scope.changeView('/gallery/' + $scope.previous_slug);
            }
        };

        $scope.next = function () {
            if ($scope.next_slug) {
                $scope.changeView('/gallery/' + $scope.next_slug);
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
        var currentPost;
        $http.get(url, {cache: true})
            .success(function (data) {
                $scope.post = data;
                currentPost = data.post;

                $scope.category = (data.post.categories[0].slug === 'featured') ? data.post.categories[1] : data.post.categories[0];

                // Inject the title into the rootScope
                $rootScope.title = data.post.title;

                $http.get('/api/get_posts/?category_name=' + $scope.category.slug + '&posts_per_page=-1', {cache: true}).success(function (data) {
                    var categoryPosts = data.posts;
                    var currentIndex = arrayObjectIndexOf(categoryPosts, currentPost);
                    if (currentIndex + 1 <= categoryPosts.length -1) {
                        $scope.next_slug = categoryPosts[currentIndex + 1].slug;
                    }
                    if (currentIndex > 0) {
                        $scope.previous_slug = categoryPosts[currentIndex - 1].slug;
                    }
                });
            })
            .error(function () {
                console.log("We have been unable to access the feed :-(");
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
                console.log("We have been unable to access the feed :-(");
            });


        $scope.isCurrent = function (route) {
            var paths = $location.path().split('/');
            return route === paths[paths.length - 2];
        }

    })
    .directive('sliderInitialise', function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope) {
                if (scope.$last){
                    setTimeout(initialiseSlider, 0);
                }
            }
        }
    })
    .directive('materialboxInitialise', function() {
        return function(scope, element, attrs) {
            initMaterialBox();
        };
    })
    .directive("ngRandomClass", function () {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                ngClasses: "=ngRandomClass"
            },
            link: function (scope, elem, attr) {
                //Add random background class to selected element
                elem.addClass(scope.ngClasses[Math.floor(Math.random() * (scope.ngClasses.length))]);
            }
        }
    });
