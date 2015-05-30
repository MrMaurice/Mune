'use strict';

angular.module('main.version', [
  'main.version.interpolate-filter',
  'main.version.version-directive'
])

.value('version', '0.1');
