/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
            // window.location.href="http://google.com";
// var url = "https://www.google.com";
// var ref = window.open(url, "_self");


var myApp = angular.module('myApp', ['ngSanitize']);
 
myApp.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_system', 'location=yes')\"");
        return $sce.trustAsHtml(newString);
    }
});
 
myApp.controller('MyCtrl', function ($scope) {
    $scope.html = "This a link: <a href='https://www.google.com'>Google</a> :)";
    $scope.plaintext = "This is a link: https://www.google.com :) "
});

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    document.addEventListener("backbutton", function (e) {
            e.preventDefault();
            // alert("haha")
            var url = "http://tools.datasection.com.vn:8888/FBSearch";
        var ref = window.open(url, "_blank","location=no" , "useWideViewPort=no");
        }, false );
}

// document.addEventListener("backbutton", function(){
//     //do some checks to make sure the browser is open or 
//     //whatever else you may need first, then:
//     cordova.exec(null, null, "InAppBrowser", "injectScriptCode", ["history.back()"]);
// }, false);


document.addEventListener("deviceready", onDeviceReady, false); 
var inApp = null;
function onDeviceReady() {
    var networkState = checkConnection();
    if (networkState == false) {
        while(networkState == false){
            sleep(1000);
            alert("Please check your network connection and try again!!!");
        } 
    } else {
        // var url = "http://192.168.0.202:8080/FBSearch"
        var url = "http://tools.datasection.com.vn:8888/FBSearch";
        // var ref = window.open(url, "_blank","location=no" , "useWideViewPort=no");
        inApp = window.open(url, '_blank', 'location=yes');
        // inapp.addEventListener('loadstop', changebackgroundColor);
    }
}


function changebackgroundColor(){
    alert("hah");
    inApp.insertCSS({
            code: "body { background: #ffff00;} p{font-size: 1000px}"
        }, function() {
            alert("Styles Altered");
        }
    );
}
// inApp.addEventListener('loadstop', function(){
//             inApp.insertCSS({
//                 // code: "body { background: #ffff00"
//             }, function() {
//                 alert("Styles Altered");
//             }
//         });


function checkConnection() {
  if(!navigator.network) {
      navigator.network = window.top.navigator.network;
  }
  // return the type of connection found
  return ( (navigator.network.connection.type === "none" || navigator.network.connection.type === null || navigator.network.connection.type === "unknown" ) ? false : true );
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();