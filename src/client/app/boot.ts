import {provide} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http'
import {FORM_PROVIDERS} from 'angular2/common';
import {ClassifiedApp} from './components/app';

bootstrap(ClassifiedApp, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	FORM_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy })
]);