import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthGuard } from '@core/guards';
import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';
import { AuthService, EditorService } from '@core/services';

const SERVICES = [AuthService, EditorService];

const GUARDS = [AuthGuard];

@NgModule()
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                ...SERVICES,
                ...GUARDS,
            ],
        };
    }
}
