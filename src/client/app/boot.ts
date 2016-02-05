import {bootstrap} from 'angular2/platform/browser';
import {bind} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './components/app';
import {HTTP_PROVIDERS} from 'angular2/http'

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	bind(LocationStrategy).toClass(HashLocationStrategy)
]);