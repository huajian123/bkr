import {Injectable, Injector} from '@angular/core';
import {HttpUtilNs, HttpUtilService} from '../../infra/http/http-util.service';
import {SearchCommonVO} from '../../vo/comm/SearchCommonVO';
import {ActionResult} from '../../vo/comm/ActionResult';
import {PageInfo} from '../../vo/comm/PageInfo';


export namespace <%= classify(name) %>ServiceNs {
    export class <%= classify(name) %>ServiceClass {
        private http: HttpUtilService;
        private defaultConfig: HttpUtilNs.UfastHttpConfig;

        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
            this.defaultConfig = {
                gateway: HttpUtilNs.GatewayKey.Bs
            };
        }
        public getShuttleBusList(params: SearchCommonVO<any>): Promise<ActionResult<PageInfo<any>>> {
                return this.http.Post('/regular/list', params).toPromise();
        }
        public getCarModel(): Promise<ActionResult<any>> {
            return this.http.Get('/carManager/getCarModel').toPromise();
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>Service extends <%= classify(name) %>ServiceNs.<%= classify(name) %>ServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
