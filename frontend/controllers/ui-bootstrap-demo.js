angular.module('ui.bootstrap.demo', ['ui.bootstrap','itemList']);

angular.module('ui.bootstrap.demo').controller('DropdownCtrl', function ($scope) {
	$scope.items = [
	'The first choice!',
	'And another choice for you.',
	'but wait! A third!'
	];

	$scope.status = {
		isopen: false
	};

	$scope.toggled = function(open) {
		console.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
});

angular.module('ui.bootstrap.demo').controller('CarouselDemoCtrl', function ($scope) {
	$scope.myInterval = 5000;
	var slides = $scope.slides = [{image:'https://lh4.googleusercontent.com/M3f43A5AMOfpBkvpPgZRZwEtX1XDUjNjibVmlM5KVtU=s192-p-no',
	text:'It\'s Me'
},
{image:'https://lh4.googleusercontent.com/GVWPuVDDPSpR2IWe2LmMB9yHHjtA981C5L7NVthSxCA=s192-p-no',
text:'Me again'
}];
$scope.addSlide = function(slide) {
slides.push(slide);
};
});		
