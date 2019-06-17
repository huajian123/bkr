import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewsCommonModules} from '../views-common-modules';
import {<%= classify(name) %>RoutingModule} from './<%= dasherize(name) %>-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ...ViewsCommonModules,
    <%= classify(name) %>RoutingModule
  ],
  declarations: []
})
export class <%= classify(name) %>Module { }
