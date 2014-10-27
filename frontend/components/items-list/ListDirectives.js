angular.module("itemList")
.directive("categorynode", function () {
	return {
		require: "^categorylst",
		link: function (scope, element, attrs, ctl) {
			
			scope.handleEvent = function (e) {
				var cat = element.attr("id") == "SelectAll" ? null:element.attr("id");
				ctl.resetCategoryClass();
				ctl.selectCategory(cat);
				element.addClass(ctl.getCategoryClass(cat));
			}
		}
	}
})
.directive("itemlst",["$filter" ,function () {
	return {
		require: "?categorylst",
		replace: true,
		link: function (scope, element, attrs, ctl) {
			
			scope.gridactive= "active";
			scope.listactive = "";
			scope.selectedPage = 1;

			//console.log("Link - selectedPage:" + scope.selectedPage);

			scope.switchView = function () {
				if (scope.gridactive != "active") {
					scope.gridactive= "active";
					scope.listactive = "";
				} else {
					scope.gridactive = "";
					scope.listactive = "active";
				}

				var theitems = element.find("ul");
				var lis = theitems.find("li");

				if (scope.gridactive != "active") {
					// remove the grid view and change to list
					theitems.removeClass("grid").addClass("list");
					lis.removeClass("thumbnail").removeClass("col-xs-4");
				} else {
					// remove the list class and change to grid
					theitems.removeClass("list").addClass("grid");
					lis.addClass("thumbnail").addClass("col-xs-4");
				}	
			};
			// scope.$watch(ctl.getSelectedCategory(), function (newValue, oldValue) {
			// 	scope.selectedCategory = newValue;
			// 	console.log("in side watch: newValue=" + newValue);
			// });
			scope.selectPage = function (page) {
				scope.selectedPage = page;
				//console.log("selectPage:" + scope.selectedPage)
			};
			scope.getPageClass = function (page) {
				return scope.selectedPage == page ? "active" : "";
			};

		},
		restrict: "AE",
		scope: {
				data: "=source",
				pageSize: "=pageSize",
				categoryFilterFn: "&filterFn",
				selectedCategoryFn: "&",
				addProductToCartFn: "&",
				getExpiryDateFn: "&",
				getSelectedPageClassFn: "&"
				},
		templateUrl: "components/items_list/itemListTemplate.html"
		}
	}])
.directive("categorylst",["$filter" ,function () {
	return {
		transclude:true,
		replace: true,
		link: function (scope, element, attrs) {
		},
		controller: function ($scope, $element, $attrs) {
			this.selectCategory = function (cat) {
				// $scope.$apply(function (cat) {
				// 	$scope.selectedCategory = cat;	
				// })				
				$scope.selectedCategory = cat;//(cat=="SelectAll"? null:cat);
				$scope.selectCategoryFn({category:cat}); 
				//Notes: this is one of ways (not elegant) to pass parameter from ctroller to directives, the key name must be matched through
				//It’s important that the parameter name match with the property name defined in the object literal
				//http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-3-isolate-scope-and-function-parameters
			};
			this.getCategoryClass = function (category) {
				return $scope.categoryClassFn({category: category});
			};
			this.resetCategoryClass = function () {
				$element.find("a").removeClass("btn-primary");
			};
		},
		restrict: "E",
		scope: {
			data:"=source",
			categoryClassFn:"&",
			selectCategoryFn:"&selectCategoryFn"
		},
		templateUrl: "components/items_list/categoryListTemplate.html"
	}
}]);

/*
one-way bindings on isolated scopes are always evaluated to string values. 
You must use a two-way binding if you want to access an array, 
even if you don’t intend to modify it

use $scope in controller: function, scope in link: function
*/