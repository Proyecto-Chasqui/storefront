import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { routes } from './multicatalog.routes';


import { MulticatalogListComponent } from './components/multicatalog-list/multicatalog-list.component';

const DECLARATIONS = [
    MulticatalogListComponent,
];

@NgModule({
    declarations: DECLARATIONS,
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [

    ],
})
export class MulticatalogModule {
}
