var feed = angular.module('myApp', []);

feed.controller('myCtrl', function($scope, $http) {
	$scope.count = 5;
	$scope.query = "";
	$scope.search = function () {
        $("#spinner").show();
        $scope.tweet_count = "";
		$scope.tweets = [];
		$http.get("query", {
			params: {
				track: $scope.query,
				count: $scope.count
			}
		}).then(function(response) {
			//$scope.tweets = response.data;
          $scope.tweets = [];
          var count = 0;
          angular.forEach(response.data, function(value) {
            var name = value["user"]["name"];
            var pic = value["user"]["profile_image_url_https"];
            var screen_name = value["user"]["screen_name"];
            var date = new Date(value["created_at"]);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            var text = value["text"];
            var favorites = value["favorite_count"];
            var retweets = value["retweet_count"];
            $scope.tweets.push({"name": name, "pic": pic, "screen_name": screen_name, "month": month, "day": day, "year": year, "text": text, "favorites": favorites, "retweets": retweets});
            count++;
          });
		  $scope.tweet_count = count;
          $("#spinner").hide();
          $scope.query = "";
		}).catch(function(response) {
          $("#spinner").hide();
          $scope.error = response.data;
        });
	}
	
});