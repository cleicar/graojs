
function ActivityPublicController($scope, $http, $q, share, Activity) {
  $scope.share = share;
  $scope.activity = {};
  $scope.errors = {};
  $scope.errors.activity = {};
  $scope.notFilter = true;
  $scope.dataList = new DataList();

  $scope.$watch("dataList", function(newDataList, oldDataList) {
    if(oldDataList.page.current != newDataList.page.current || 
      oldDataList.page.limit != newDataList.page.limit) {
      newDataList.page.skip = newDataList.page.current * newDataList.page.limit - newDataList.page.limit;
      $scope.query();
    }
  }, true);

  $scope.createOrUpdate = function(windowCallBack) {
    share.alertLoad();
    function save() {
      var activityJson = $scope.activity;

      if($scope.activity._id != null)
        Activity.update(activityJson, function(dataResponse){ 
          if(validate(share.alert, $scope.errors.activity, dataResponse)){ 
            $scope.query(); 
            $scope.count(); 
            $scope.clear(); 
            share.window(windowCallBack); 
          }
        });
      else
        Activity.save(activityJson, function(dataResponse){ 
          if(validate(share.alert, $scope.errors.activity, dataResponse)){ 
            $scope.query(); 
            $scope.count(); 
            $scope.clear(); 
            share.window(windowCallBack); 
          }
        });
    } 
    save();
  }

  $scope.destroyByIndex = function(index) {
    share.alertLoad();
    $scope.dataList.data[index].$delete(function(dataResponse){
      share.alert.show = true;
      share.alert.style = dataResponse.event.style;
      share.alert.message = dataResponse.event.message;
    });
    $scope.dataList.data.splice(index, 1);
  }

  $scope.filter = function() {
    share.alertLoad();
    $scope.dataList.data = Activity.query($scope.dataList.toParams(), function(){
      share.alertClean();
    });
  }

  $scope.query = function() {
    share.alertLoad();
    $scope.dataList.data = Activity.query($scope.dataList.toParams(), function(){ 
      $scope.dataList.status.listing = $scope.dataList.data.length;
      share.alertClean();
    });
  }
  $scope.query();

  $scope.count = function() {
    $scope.dataList.status = Activity.count($scope.dataList.toParams(), function(dataResponse){
      $scope.dataList.status.listing = $scope.dataList.data.length;
    });
  }
  $scope.count();

  $scope.queryMore = function() {
    share.alertLoad();
    $scope.dataList.page.skip = $scope.dataList.data.length;
    var moreActivitys = Activity.query($scope.dataList.toParams(), function(){
      angular.forEach(moreActivitys, function(activity){
        $scope.dataList.data.push(activity);
        $scope.dataList.status.listing++;
      });
      share.alertClean();
    });
  }

  $scope.select = function(index) {
    $scope.activity = $scope.dataList.data[index];

      var activitysIds = new Array();
      angular.forEach($scope.activity.activitys, function(activity){
        activitysIds.push(activity._id);
      });
      $scope.activity.activitys = activitysIds;

  }

  $scope.clear = function() {
    delete $scope.activity;
    $scope.activity = {};
    $scope.clearActivityActivitys();
  }
  $scope.queryActivity = function(){
    $scope.activitys = Activity.query();
  };
  $scope.queryActivity();

  $scope.activity.activitys = new Array();
  $scope.newActivityActivitys = {};
  $scope.errors.newActivityActivitys = {};

  $scope.createOrUpdateActivityActivitys = function() {
    function save(dataResponse) {
      if(validate(share.alert, $scope.errors.newActivityActivitys, dataResponse)) {
        $scope.activitys.push(dataResponse.data);

        if(!($scope.activity.activitys instanceof Array))
          $scope.activity.activitys = new Array();
        $scope.activity.activitys.push(dataResponse.data._id);

        $scope.clearActivityActivitys();
        share.windowBack();
      }
    }
    if($scope.newActivityActivitys._id != null)
      Activity.update($scope.newActivityActivitys, save);
    else
      Activity.save($scope.newActivityActivitys, save);
  }

  $scope.clearActivityActivitys = function() {
    delete $scope.newActivityActivitys;
    $scope.newActivityActivitys = {};
  }

}