var debugging = false;
var shuffleArray = function (array) {
	var m = array.length, t, i;

	// While there remain elements to shuffle
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

var validateAge = function(age){
	return /\d{1,3}/.test(value);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var isOK = function (t){
		if (t === undefined) {return false;}
		else {return t != "";}
}

var nId = function(id) {
	return id < 0 ? '_'+Math.abs(id) : ''+id;
}

var xml2form = function (xml) {
	var	parser = new DOMParser();
	var	xmlDoc = parser.parseFromString(xml, "application/xml");
	var	xmlDocStatementNodes = xmlDoc.getElementsByTagName("input");
	var forms = [];

	for (i = 0; i < xmlDocStatementNodes.length; i++) {
		var el = xmlDocStatementNodes[i];
		var type = el.getAttribute('type'); //ok
		var req = el.getAttribute('required'); //ok
		if (isOK(req)) {
			req = req == "true" ? true : false;
		}
		var key = el.getAttribute('key');// ok
		var label = el.getElementsByTagName('label')[0].childNodes[0].nodeValue;
		
		var form = {};
		form.key = key;
		form.type = type;
		form.templateOptions = {};
		if (isOK(label)){
			form.templateOptions.label = label;
		}
		if (isOK(req)){
			form.templateOptions.required = req;
		}

		if (type == 'select' || type == 'radio' || type == 'multiCheckbox') {
			var options = el.getElementsByTagName('option');
			form.templateOptions.options = [];
			for (let opt of options) {
				if (isOK(opt)) {
					var opt_name = opt.getAttribute('name');
					var opt_value = opt.childNodes[0].nodeValue;
					if (type == 'multicheckbox') {
						form.templateOptions.options.push({title:opt_name,value:opt_value});
					}
					else if (isOK(opt_name)&&isOK(opt_value)) {
						form.templateOptions.options.push({name:opt_name,value:opt_value});
					} else if (isOK(opt_value)&&!isOK(opt_name)) {
						form.templateOptions.options.push({name:opt_value,value:opt_value});
					}
				}
			}
		} 
		forms.push(form);
	}
	return forms;
}

var xml2html = function (xml) {
	var	parser = new DOMParser();
	var	xmlDoc = parser.parseFromString(xml, "application/xml");

	if (xmlDoc.documentElement.nodeName == "parsererror") {
		return {};
	}

	var	xmlDocStatementNodes = xmlDoc.getElementsByTagName("div");
	var pages = [];

	for (i = 0; i < xmlDocStatementNodes.length; i++) {
		var el = xmlDocStatementNodes[i];
		pages.push (el); 
	}
	return pages;
}


//Warning for future maintainers: for some reason, the column was growing bigger
//than value set here, so (rows-1)+3 basically works around this issue
 // 32 is the height of the cell
var workAroundpx = function(rows){
	return (rows*32) - rows+2;
}
var generateMyTd = function(id, rows, colour) {
	var toptd = document.createElement('td');
	// toptd attr	
	var toptdstyle = document.createAttribute('style');
	toptdstyle.value = "vertical-align:top";
	toptd.setAttributeNode(toptdstyle);

	var topdiv = document.createElement('div');
	// topdiv attr	
	var topdivStyle = document.createAttribute('style');
	topdivStyle.value = "width:150px;padding-right:10px;";
	topdiv.setAttributeNode(topdivStyle);

	var paneldiv = document.createElement('div');
	// paneldiv attr	
	var paneldivClass = document.createAttribute('class');
	paneldivClass.value = "panel panel-info";
	paneldiv.setAttributeNode(paneldivClass);

	var panelheadingdiv = document.createElement('div'); 
	// panelheadingdiv attr	
	var panelheadingdivclass = document.createAttribute('class');
	panelheadingdivclass.value = "panel-heading";
	panelheadingdiv.setAttributeNode(panelheadingdivclass);
	panelheadingdiv.setAttribute("style",
	"background-image:\
	 linear-gradient(to bottom,"+colour+" 0,"+colour+" 100%)!important;"); //border-color

	var paneltitleh3 = document.createElement('h3');
	// paneltitleh3 attr	
	var paneltitleh3class = document.createAttribute('class');
	paneltitleh3class.value	= "panel-title";
	var paneltitleAlign = document.createAttribute('align');
	paneltitleAlign.value = "center";
	var paneltitleTextNode = document.createTextNode(id);
	paneltitleh3.setAttributeNode(paneltitleh3class);
	paneltitleh3.setAttributeNode(paneltitleAlign);
	paneltitleh3.appendChild(paneltitleTextNode);

	var innerul = document.createElement('ul');
	// innerul attr	
	var innerulDndListAttr = document.createAttribute('dnd-list');
	innerulDndListAttr.value = "ratings.rating" + nId(id);
	var innerulDndDropAttr = document.createAttribute('dnd-drop');
	innerulDndDropAttr.value = "dropCallback(index, item, external, type)";
	var innerulDndDisableIfAttr = document.createAttribute('dnd-disable-if');
	innerulDndDisableIfAttr.value = "ratings.rating"+nId(id)+".length >=" + rows;
	var innerulStyleAttr = document.createAttribute('style');
	innerulStyleAttr.value = "height: " + workAroundpx(rows) + 'px';
	innerul.setAttributeNode(innerulDndListAttr);
	innerul.setAttributeNode(innerulDndDropAttr);
	innerul.setAttributeNode(innerulDndDisableIfAttr);
	innerul.setAttributeNode(innerulStyleAttr);

	var tooltipdiv = document.createElement('div');
	// tooltipdiv attr	
	var tooltipdivTooltipsTemplateAttr =
	 document.createAttribute('tooltip-template');
	tooltipdivTooltipsTemplateAttr.value = 
	   "<div class='ttiptext'>{{statement.statement}}</div>";
	var tooltipdivTooltipSideAttr =
	 document.createAttribute('tooltip-side');
	tooltipdivTooltipSideAttr.value = "right";
	var tooltipdivTooltipSizeAttr = 
	 document.createAttribute('tooltip-size');
	tooltipdivTooltipSizeAttr.value = "large";
	var tooltipdivNgRepeat =
	 document.createAttribute('ng-repeat');
	tooltipdivNgRepeat.value 
	 = "statement in "+"ratings.rating"+nId(id);
	tooltipdiv.setAttribute("tooltips",'');
	tooltipdiv.setAttributeNode(tooltipdivTooltipsTemplateAttr);
	tooltipdiv.setAttributeNode(tooltipdivTooltipSideAttr);
	tooltipdiv.setAttributeNode(tooltipdivTooltipSizeAttr);
	tooltipdiv.setAttributeNode(tooltipdivNgRepeat);

	var innerli = document.createElement('li');
	// innerli attr	
	//innerli attributes
	var innerliDndDraggableAttr = document.createAttribute
		('dnd-draggable');
	innerliDndDraggableAttr.value = "statement";
	var innerliDndMovedAttr = document.createAttribute
		('dnd-moved');
	innerliDndMovedAttr.value = "ratings.rating"+nId(id)+
		".splice($index,1)";
	var innerliDndEfctAlwdAttr = document.createAttribute
	('dnd-effect-allowed');
	innerliDndEfctAlwdAttr.value = "move";
	var innerliNgStyle = document.createAttribute
	('ng-style');
	innerliNgStyle.value = "getStyle(statement)";
	var innerliTextNode = document.createTextNode
		("{{ statement.statement|truncate:10 }}");
	innerli.setAttributeNode(innerliDndDraggableAttr);
	innerli.setAttributeNode(innerliDndMovedAttr);
	innerli.setAttributeNode(innerliDndEfctAlwdAttr);
	innerli.setAttributeNode(innerliNgStyle);
	innerli.appendChild(innerliTextNode);

	var placeholderli = document.createElement('li');
	// placeholderli attr	
	var placeholderliClass = document.createAttribute("class");
	placeholderliClass.value="dndPlaceholder";
	var placeholderliStyle = document.createAttribute("style");
	placeholderliStyle.value="display: none;";
	placeholderli.setAttributeNode(placeholderliClass);
	placeholderli.setAttributeNode(placeholderliStyle);
	

	tooltipdiv.appendChild(innerli);
	innerul.appendChild(tooltipdiv);
	innerul.appendChild(placeholderli);
	panelheadingdiv.appendChild(paneltitleh3);
	paneldiv.appendChild(panelheadingdiv);
	paneldiv.appendChild(innerul);
	topdiv.appendChild(paneldiv);
	toptd.appendChild(topdiv);
	return toptd;
}

var app = angular.module('qmethod', ['formly','formlyBootstrap','ui.router', 'dndLists', 'igTruncate', '720kb.tooltips']);

// ========== CONFIG
app.config(function ($stateProvider, $locationProvider) {

	$locationProvider.hashPrefix('');

	/*
	$stateProvider.state({
		name: 'step1',
		url: '/step1',
		templateUrl: 'templates/step1.html',
		controller: 'step1Ctrl',
		resolve: {
			'promisedata': ['$http', function($http){
				return $http.get('settings/survey.xml');
			}],
			'startingPages': ['$http', function($http){
				return $http.get('settings/startingPages.xml');
			}]
		}
	});
	*/

	$stateProvider.state({
		name: 'step1',
		url: '/step1',
		templateUrl: 'templates/step1.html',
		controller: 'step1Ctrl',
		resolve: {
			'startingPages': ['$http', function($http){
				return $http.get('settings/startingPages.xml');
			}]
		}
	});

	$stateProvider.state({
		name: 'step3',
		url: '/step3',
		templateUrl: 'templates/step3.html',
		controller: 'step3Ctrl',
		resolve: {
			'promisedata': ['$http', function($http){
				return $http.get('settings/statements.xml');
			}]
		}
	});

	$stateProvider.state({
		name: 'step4',
		url: '/step4',
		templateUrl: 'templates/step4.html',
		controller: 'step4Ctrl',
		resolve: {
			'promisedata': ['$http', function($http){
				return $http.get('settings/map.xml');
			}]
		}
	});

	$stateProvider.state({
		name: 'step5',
		url: '/step5',
		templateUrl: 'templates/step5.html',
		controller: 'step5Ctrl'
	});

	/*
	$stateProvider.state({
		name: 'step6',
		url: '/step6',
		templateUrl: 'templates/step6.html',
		controller: 'step6Ctrl'
	});
	*/

	$stateProvider.state({
		name: 'step6',
		url: '/step6',
		templateUrl: 'templates/survey.html',
		controller: 'step6Ctrl'
	});

	$stateProvider.state({
		name: 'step7',
		url: '/step7',
		templateUrl: 'templates/step7.html',
		controller: 'step7Ctrl'
	});
});

var config = {
    apiKey: "AIzaSyD9696uuH1Rug9S2Jh0gYOAPcP8okUP8Ps",
    authDomain: "qmethod-443fd.firebaseapp.com",
    databaseURL: "https://qmethod-443fd.firebaseio.com",
    projectId: "qmethod-443fd",
    storageBucket: "qmethod-443fd.appspot.com",
    messagingSenderId: "929137181105"
};

if (!angular.equals({},config)) {
  	  firebase.initializeApp(config);
	  var rootRef = firebase.database().ref();
}

  
// ========== CONTROLLERS
app.controller("appCtrl", function ($scope, $rootScope, $state) {
	$state.go('step1');
});

app.controller("step1Ctrl",[/*'promisedata',*/'startingPages',
		'$scope','$rootScope','$state','$sce',function
	   	(/*promisedata,*/startingPages,$scope,$rootScope,$state,$sce) {
	
	//$rootScope.formFields = xml2form(promisedata.data);
	
	$rootScope.formFields = [
			{
			  "key": "geo",
			  "type": "input",
			  "templateOptions": {
				"label": "Please enter the country you currently work on.",
				"maxlength" : "40",
				"required" : true
			  }
			},
			{
			  "key": "edu",
			  "type": "radio",
			  "templateOptions": {
				"label": "Please select your educational level.",
				"required": true,
				"options": [
				  {
					"name": "PhD",
					"value": "phd"
				  },
				  {
					"name": "PhD Student",
					"value": "phdstu"
				  },
				  {
					"name": "Master",
					"value": "msc"
				  },
				  {
					"name": "Master Student",
					"value": "mscstu"
				  },
				  {
					"name": "Undergraduate",
					"value": "und"
				  },
				  {
					"name": "Undergraduate Student",
					"value": "undstud"
				  },
				  {
					"name": "Other",
					"value": "other"
				  }
				]
			  }
			},
			{
			  "key": "edu_other",
			  "type": "input",
			  "templateOptions": {
				  "label": "Please, specify here",
				  "maxlength" : "40",
				  "required": true
				},
			  "hideExpression" : "model.edu != \"other\""
			},
			{
				"key": 'occupation',
				"type": 'multiCheckbox',
				"templateOptions": {
				  "label": 'What is your current job? (You can select multiple options)',
				  "options": [{"id": "opedev", "title" : "Open-Source Developer"}, 
								{"id": "inddev", "title" : "Academic Researcher"},
								{"id": "acares", "title" : "Industrial Developer"},
								{"id": "indres", "title" : "Industrial Researcher"},
								{"id": "other", "title" : "Other"}],							
				  "valueProp": 'id',
				  "labelProp": 'title'
				}
			},
			{
				"key": "ocu_other",
				"type": "input",
				"templateOptions": {
					"label": "Please, specify here",
					"maxlength" : "40",
					"required": true
				  },
				"hideExpression" : "model.occupation != \"other\""
			},
			{
				"key": "leve_exp",
				"type": "select",
				"templateOptions": {
				  "label": "Please rate your expertise with software development.",
				  "required": true,
				  "valueProp": "name",
				  "options": [
					{
					  "name": "Very poor"
					},
					{
					  "name": "Poor"
					},
					{
					  "name": "Fair"
					},
					{
					  "name": "High"
					},
					{
					  "name": "Very high"
					}
				  ]
				}
			},
			{
				"key": "code_review",
				"type": "select",
				"templateOptions": {
				  "label": "Please rate your expertise with code review.",
				  "required": true,
				  "valueProp": "name",
				  "options": [
					{
					  "name": "Very poor"
					},
					{
					  "name": "Poor"
					},
					{
					  "name": "Fair"
					},
					{
					  "name": "High"
					},
					{
					  "name": "Very high"
					}
				  ]
				}
			},
			{
				"key": "rep_bugs",
				"type": "select",
				"templateOptions": {
				  "label": "Please rate your expertise with bugs reporting.",
				  "required": true,
				  "valueProp": "name",
				  "options": [
					{
					  "name": "Very poor"
					},
					{
					  "name": "Poor"
					},
					{
					  "name": "Fair"
					},
					{
					  "name": "High"
					},
					{
					  "name": "Very high"
					}
				  ]
				}
			},
			{
				"key": "fix_bugs",
				"type": "select",
				"templateOptions": {
				  "label": "Please rate your expertise with bug fixing.",
				  "required": true,
				  "valueProp": "name",
				  "options": [
					{
					  "name": "Very poor"
					},
					{
					  "name": "Poor"
					},
					{
					  "name": "Fair"
					},
					{
					  "name": "High"
					},
					{
					  "name": "Very high"
					}
				  ]
				}
			},
			{
				"key": "tests",
				"type": "select",
				"templateOptions": {
				  "label": "Please rate your expertise with tests.",
				  "required": true,
				  "valueProp": "name",
				  "options": [
					{
					  "name": "Very poor"
					},
					{
					  "name": "Poor"
					},
					{
					  "name": "Fair"
					},
					{
					  "name": "High"
					},
					{
					  "name": "Very high"
					}
				  ]
				}
			},
			{
			  "type": "textarea",
			  "key": "input_perceive",
			  "templateOptions": {
			  "label": "During a software development did you notice any changes that introduced bugs? If yes, how did you perceive the buggy code?"
			  }
			},
			{
				"key": "input_buggy",
				"type": "input",
				"templateOptions": {
					"label": "Could you provide the address of this buggy code?"
				  },
				  "expressionProperties": {
					'templateOptions.disabled': '!model.input_perceive'
				  }
			},
			{
				"key": "input_open",
				"type": "input",
				"templateOptions": {
					"label": "Have you ever contributed for open source projects? If yes, could you provide the addresses of these projects?"
				  }
			},
			{
				"key": "email",
				"type": "input",
				"templateOptions": {
					"label": "Please enter your e-mail (it will not be disclosed), if you want to participate on the raffle of US$ 100 voucher at Amazon.com or want be contacted in future researches."
				  }
			},
			{
				"type": "textarea",
				"key": "comments",
				"templateOptions": {
				"label": "Do you have any comments regarding this research?"
				}
			}
		  ];
	
	$scope.currentPageIndex = 0;
	$scope.pageData = xml2html(startingPages.data);
	$scope.debugging = angular.copy(debugging);
  	if (!angular.equals({},$scope.pageData)) {
		$scope.currentPage = $sce.trustAsHtml($scope.pageData[0].outerHTML);
		$scope.maxPages = $scope.pageData.length;
	} else {
		$scope.currentPage = $sce.trustAsHtml("<h3>Error parsing settings/startingPages.xml; Please, check for syntax errors.</h3>");
		$scope.maxPages = $scope.pageData.length;
	}

	$scope.changePage = function() {
		$scope.currentPage = $sce.trustAsHtml($scope.pageData[$scope.currentPageIndex].outerHTML);
	}


	$scope.next = function () {
		if ($scope.currentPageIndex+1 >= $scope.maxPages || debugging) {
			$state.go('step3');
		} else {
			$scope.currentPageIndex += 1;	
			$scope.changePage();
		}
	}
	$scope.back = function () {
		if ($scope.currentPageIndex-1 >= 0) {
			$scope.currentPageIndex -= 1;
			$scope.changePage();
		}
	}
}]);

app.controller("step3Ctrl",['promisedata','$scope', '$rootScope', '$state', function (promisedata, $scope, $rootScope, $state) {

	statements = [];
	$scope.debugging = angular.copy(debugging);
	if (typeof $rootScope.statements == "undefined") {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(promisedata.data,"application/xml");
		xmlDocStatementNodes = xmlDoc.getElementsByTagName("statement");
		for (i=0; i < xmlDocStatementNodes.length; i++) {
			el = xmlDocStatementNodes[i];
			el_id = el.getAttribute('id');
			el_value = el.childNodes[0].nodeValue;
			statements.push({id: el_id, statement: el_value});
		}
		//Pick how many statements we have so we can use it for checks
		$rootScope.numberOfStatements = 
			JSON.parse(JSON.stringify(statements.length));
		shuffleArray(statements);
		$rootScope.statements = JSON.parse(JSON.stringify(statements));
	}

	$scope.cards = {
		selected: null,
		first: 1,
		statements: $rootScope.statements,
	};

	$scope.classifications = {
		'AGREE': [],
		'NEUTRAL': [],
		'DISAGREE': [],
	};

	$('#helpModal').modal(show = true);

	/*Checks if $rootScope is already defined (the user had made his classifications)*/
	if (typeof $rootScope.classifications == "undefined") {
		if (typeof $rootScope.classifications_step3 != "undefined") {
		}
		$rootScope.classifications = $scope.classifications;
	} else {
		$scope.classifications = $rootScope.classifications;
	}

	$scope.hasNoCategory = function (statement) {
		return statement.category != "undefined";
	}


	$scope.done = function () {
		return $rootScope.statements.length == 0;
	}

	$scope.next = function () {
		$rootScope.classifications_step3 = JSON.parse(JSON.stringify($rootScope.classifications));
		$state.go('step4');
	}

	$scope.back = function () {
		$state.go('step1');
	}

	if (debugging) {
		$scope.help = function () {
			for (var i = 0; i < 50 && ($rootScope.classifications.length != 0); ++i) {
				var ii = i % 3;
				var s = $rootScope.statements.shift();
				if (ii == 0) {
					s.category = "agree";
					$scope.classifications.AGREE.push(s);
				} else if (ii == 1) {
					s.category = "neutral";
					$scope.classifications.NEUTRAL.push(s);
				} else if (ii == 2) {
					s.category = "disagree";
					$scope.classifications.DISAGREE.push(s);
				}
			}
		}
		$scope.help();
	}

	$scope.dropAgreeCallback = function (index, item, external, type) {

		if ($scope.cards.first == item.id) {
			$scope.cards.first = $scope.cards.first + 1;
		}
		item.category = "agree";
		$scope.classifications.AGREE.push(item);

		return true;
	}

	$scope.dropNeutralCallback = function (index, item, external, type) {
		if ($scope.cards.first == item.id) {
			$scope.cards.first = $scope.cards.first + 1;
		}

		item.category = "neutral";
		$scope.classifications.NEUTRAL.push(item);

		return true;
	}

	$scope.dropDisagreeCallback = function (index, item, external, type) {
		if ($scope.cards.first == item.id) {
			$scope.cards.first = $scope.cards.first + 1;
		}

		item.category = "disagree";
		$scope.classifications.DISAGREE.push(item);

		return true;
	}
}]);

app.controller("step4Ctrl",['promisedata','$scope', '$rootScope', '$state','$compile', function (promisedata, $scope, $rootScope, $state, $compile) {

	// //If user has distributed over normal distribution re-use it
	$scope.ratings = [];
	$scope.classifications = JSON.parse(JSON.stringify($rootScope.classifications));
	$scope.debugging = angular.copy(debugging);

	if (typeof $rootScope.ratings != "undefined"){
		$scope.ratings = JSON.parse(JSON.stringify($rootScope.ratings));
		$scope.classifications.AGREE = [];
		$scope.classifications.NEUTRAL = [];
		$scope.classifications.DISAGREE = [];
	}
	var smallerLabel = {};
		 smallerLabel.value = 0;
		smallerLabel.rating_id = '';

	var biggerLabel = {};
		biggerLabel.value = 0;
		biggerLabel.rating_id = '';

	if (typeof $rootScope.table == "undefined") {
		var tr_el = document.createElement('tr');

		parser = new DOMParser();
		xmlDoc = parser.parseFromString(promisedata.data, "application/xml");
		xmlDocStatementNodes = xmlDoc.getElementsByTagName("column");
		for (i = 0; i < xmlDocStatementNodes.length; i++) {
			var el = xmlDocStatementNodes[i];
			var el_id = parseInt(el.getAttribute('id'), 10);
			var el_rating_id =  "rating"+ (el_id < 0 ? ('_'+Math.abs(el_id)) : el_id );
			var el_colour = String(el.getAttribute('colour'));
			var el_rows = parseInt(el.childNodes[0].nodeValue, 10);
			if (el_colour != "null" && el_id != "NaN" && el_rows != "NaN") {
				if (el_id < smallerLabel.value){
					smallerLabel.value = el_id;
					smallerLabel.rating_id = el_rating_id;
				}
				if (el_id > biggerLabel.value){
					biggerLabel.value = el_id;
					biggerLabel.rating_id = el_rating_id;
				}
				tr_el.appendChild(generateMyTd(el_id,el_rows,el_colour));
				$scope.ratings[el_rating_id] = [];
			}	
		}

		$rootScope.table = tr_el;
		$rootScope.ratingsNegExt = smallerLabel.rating_id;
		$rootScope.ratingsPosExt = biggerLabel.rating_id;
		$rootScope.ratingsPosExtId = biggerLabel.value;
		$rootScope.ratingsNegExtId = smallerLabel.value;
	}
	if ((typeof $rootScope.tablecompiled == "undefined") &&
	 typeof $rootScope.table != "undefined") {
		//HIC SUNT DRACONES
		//Compile table
		var cpy = $rootScope.table.cloneNode(true);
		var linkFn = $compile(cpy);
		//Link table
		var content = linkFn($scope);
		//Store table into rootscope
		$rootScope.tablecompiled = content[0];
	}

	if ($rootScope.table != "undefined"){
		var table = document.getElementsByTagName('table')[0];

		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}

		table.append($rootScope.tablecompiled);
	}

	$scope.dropAgreeCallback = function (index, item, external, type) {
		var ret = item.category == "agree";
		if (ret) {
			$scope.classifications.AGREE.push(item);
		} else {
		}
		return ret;
	};

	$scope.dropNeutralCallback = function (index, item, external, type) {
		var ret = item.category == "neutral";
		if (ret) {
			$scope.classifications.NEUTRAL.push(item);
		}
		return ret;
	};

	$scope.dropDisagreeCallback = function (index, item, external, type) {
		var ret = item.category == "disagree";
		if (ret) {
			$scope.classifications.DISAGREE.push(item);
		}
		return ret;
	};

	$scope.done = function () {
		var numberOfStatements = 0;
		for (var key in $scope.ratings) {
			if ($scope.ratings.hasOwnProperty(key)) {
				numberOfStatements += $scope.ratings[key].length;
			}
		}
		return numberOfStatements == $rootScope.numberOfStatements;
	};

	$('#helpModal').modal(show = true);

	$scope.getStyle = function(statement) {
		if(statement.category == "agree") {
			return {"background-color":"#00A848"};
		} else if (statement.category == "neutral") {
			return {"background-color":"#BAB9B9"};
		} else {
			return {"background-color":"#FF6666"};
		}
	}

	$scope.next = function () {
		//Copy ratings defined on this step to rootScope so we can send later
		$rootScope.ratings = Object.assign({}, $scope.ratings);
		delete $rootScope.tablecompiled;
		$state.go('step5');
	}

	$scope.back = function () {
		delete $rootScope.tablecompiled;
		delete $rootScope.ratings;
		$state.go('step3');
	}

	$scope.dropCallback = function (index, item, external, type) {
		return item;
	}
	if (debugging) {
		$scope.help = function() {
			var concatlists = [];
			concatlists = concatlists.concat($scope.classifications.AGREE,
					$scope.classifications.NEUTRAL ,
					$scope.classifications.DISAGREE);
			$scope.classifications.AGREE = [];
			$scope.classifications.NEUTRAL = [];
			$scope.classifications.DISAGREE = [];
			for(var i = 0; i < 2; ++i){
				$scope.ratings.rating3.push(concatlists.shift());
				$scope.ratings.rating_3.push(concatlists.shift());
			}
			for(var i = 0; i < 6; ++i){
				$scope.ratings.rating2.push(concatlists.shift());
				$scope.ratings.rating_2.push(concatlists.shift());
			}
			for(var i = 0; i < 10; ++i){
				$scope.ratings.rating1.push(concatlists.shift());
				$scope.ratings.rating_1.push(concatlists.shift());
			}
			for(var i = 0; i < 14; ++i){
				$scope.ratings.rating0.push(concatlists.shift());
			}
		}
		$scope.help();
	}
}]);

app.controller("step5Ctrl", function ($scope, $rootScope, $state) {

//		$rootScope.ratingsNegExt = smallerLabel.rating_id;
//		$rootScope.ratingsPosExt = biggerLabel.rating_id;
	$scope.positiveExtreme = $rootScope.ratingsPosExtId; 
	$scope.negativeExtreme = $rootScope.ratingsNegExtId; 
	$scope.debugging = angular.copy(debugging);
	var negativeExtremesArr = $rootScope.ratings[$rootScope.ratingsNegExt]; 
	var positiveExtremesArr = $rootScope.ratings[$rootScope.ratingsPosExt]; 
	if (typeof $rootScope.explanations == "undefined") {
		var posextremeExplanations = [];
		var negextremeExplanations = [];
		for (var key in negativeExtremesArr) {
			negextremeExplanations.push({statement:negativeExtremesArr[key],explanation:""});
		}
		for (var key in positiveExtremesArr) {
			posextremeExplanations.push({statement:positiveExtremesArr[key],explanation:""});
		}
		$rootScope.explanations = {
			agree: posextremeExplanations,
			disagree: negextremeExplanations
		};
	}

	if (debugging) {
		for (let obj of $rootScope.explanations.agree) {
			obj.explanation = "TEST EXPLANATION";
		}
		for (let obj of $rootScope.explanations.disagree) {
			obj.explanation = "TEST EXPLANATION";
		}
	}

	$('#helpModal').modal(show = true);

	$scope.done = function () {
		var explanationsDone = 1;
		for (var key in $rootScope.explanations.agree){
			//prevent overflow
			explanationsDone = explanationsDone *
			($rootScope.explanations.agree[key].explanation.length > 0  ? 1 : 0);
		}
		for (var key in $rootScope.explanations.disagree){
			explanationsDone = explanationsDone*
			($rootScope.explanations.disagree[key].explanation.length > 0 ? 1 : 0); } return explanationsDone > 0;
	}

	$scope.next = function () {
		$state.go('step6');
	}

	$scope.back = function () {
		$state.go('step4');
	}

	String.prototype.isEmpty = function () {
		return (this.length === 0 || !this.trim());
	};
});

app.controller("step6Ctrl",['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

	var vm = this;
	vm.model = {};
	vm.onSubmit = $scope.onSubmit;
	vm.userForm = $scope.userForm;
	vm.userFields = $rootScope.formFields;
	$scope.debugging = angular.copy(debugging);

			
	$scope.user = {};
	
	$scope.user.selectedJobs = {};
	
	$scope.jobs = [{'name':'Open Source Developer', 'id':1}, {'name':'Academic Researcher', 'id':2}, {'name':'Industrial Developer', 'id':3}, 
								 {'name':'Industrial Researcher', 'id':4}, {'name':'Other', 'id':5}];
	
	$scope.someSelected = function (object) {
		return Object.keys(object).some(function (key) {
			return object[key];
		});
	}
	
	$scope.submitForm = function() {
			console.log($scope.inputForm.selectedJobs);
	}
	

	
	$scope.submit = function() {
		$scope.send();
	}

	$scope.back = function () {
		$state.go('step5');
	}

	$scope.send = function () {
		var response = {
			classifications: {
				'AGREE':[],
				'DISAGREE':[],
				'NEUTRAL':[]
			},
			ratings: {},
			explanations: {agree:[],disagree:[]},
			questionnaire: {}
		}
		response.questionnaire = angular.copy($scope.user);

		//response.questionnaire = angular.copy(vm.model);
		
		// Send classifications statement only 
		angular.forEach($rootScope.classifications_step3, function(value, key) {
			for(let stat of $rootScope.classifications_step3[key]) {
				response.classifications[key].push(stat.id);
			}
		});

		//Send ratings but with statement id only
		angular.forEach($rootScope.ratings, function(value, key) {
			for(let stat of $rootScope.ratings[key]) {
				if(response.ratings[key] === undefined) {
					response.ratings[key] = [];
				}
				response.ratings[key].push(stat.id);
			}
		});

		//Send explanations text paired with staexplanationstement id only
		for (let exp of $rootScope.explanations.agree){
			response.explanations.agree.push({statementId:exp.statement.id,text:exp.explanation});
		}
		for (let exp of $rootScope.explanations.disagree){
			response.explanations.disagree.push({statementId:exp.statement.id,text:exp.explanation});
		}

		if (typeof rootRef != "undefined") {
			rootRef.push(response, function (error) {
				if (error) {
					alert("Couldn't send data to firebase. Cause:"+error);
					$scope.send();
					return;
				} else {
					$state.go('step7');
				}
			});
		} else {
			console.log (JSON.stringify(response));
		}
	}

}]);

app.controller("step7Ctrl", function ($scope, $rootScope, $state) {
	$scope.debugging = angular.copy(debugging);
});
