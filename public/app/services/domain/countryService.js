angular.module('myApp').service('CountryService', ['$http', '$q', 'baseApi', 'QueryBuilderService', function ($http, $q, baseApi, QueryBuilderService) {

	var CountryService = {};

	var resourceUrl = baseApi + '/countries';
	var fields = null;

	function buildFields() {
		if (!fields) {
			fields = [
			{name: 'isoCode', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'description', type: 'string'}
				
			];
		}
		return fields;
	}

	//-- Public API -----

	CountryService.getCount =  function (opts) {
		opts = opts || {};
		opts.fields = opts.fields || buildFields();
		opts.count = true;		
		var q = QueryBuilderService.buildBaucisQuery(opts);
		return $http.get(resourceUrl + q);
	};
	
	CountryService.getList = function (opts) {
		opts = opts || {};
		opts.fields = opts.fields || buildFields();
		var q = QueryBuilderService.buildBaucisQuery(opts);
		return $http.get(resourceUrl + q);
	};

	function exportQuery(opts) {
		opts = opts || {};
		opts.paginate = false;
		opts.fields = opts.fields || buildFields();
		var q = QueryBuilderService.buildBaucisQuery(opts);
		return q;	
	}

	CountryService.getListAsCsv = function (opts) {
		var q = exportQuery(opts);
		return $http({
			method: 'GET', 
			url: resourceUrl + q, 
			headers: {'Accept': 'text/csv'} 
		});
	};	

	CountryService.getFileAsCsv = function (opts) {
		var q = exportQuery(opts);
		return $http({
			method: 'GET', 
			url: resourceUrl + q, 
			headers: {'Accept': 'text/csv'} 
		});
	};	
	CountryService.getFileAsXml = function (opts) {
		var q = exportQuery(opts);
		return $http({
			method: 'GET', 
			url: resourceUrl + q, 
			headers: {'Accept': 'text/xml'} 
		});
	};		
	CountryService.getFileAsXlsx = function (opts) {
		var q = exportQuery(opts);
		return $http({
			method: 'GET', 
			url: resourceUrl + q, 
			headers: {'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
			responseType: 'blob' 
		});
	};		
	
	CountryService.get = function (link) {
		return $http.get(link);
	};
	
	CountryService.getDocument = function (id) {
		return CountryService.get(resourceUrl + '/' + id );
	};

	CountryService.add = function (item) {
		return $http.post(resourceUrl, JSON.stringify(item));
	};

	CountryService.update = function (item) {
		return $http.put(resourceUrl + '/' + item._id, JSON.stringify(item));
	};

	CountryService.delete = function (id) {
		return $http.delete(resourceUrl + '/' + id);
	};

	CountryService.deleteMany = function (ids) {
		var msg = { 
			'ids'		: ids
		};	
		return $http.post(resourceUrl + '/deleteByIds', JSON.stringify(msg));
	};	

	CountryService.deleteByQuery = function (opts) {
		opts = opts || {};
		opts.fields = opts.fields || buildFields();
		opts.paginate = false;		
		var q = QueryBuilderService.buildBaucisQuery(opts);
		return $http.delete(resourceUrl + q);
	};
	
	return CountryService;

}]);
