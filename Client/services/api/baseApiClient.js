import {SiteRoot} from "../config/variables";
import TokenStorage from "../auth/tokenStorage";
import transport from "./httpTransport";

class BaseApiClient{
    constructor(){
        this.apiUrl = SiteRoot + '/api';
        this.transport = new transport();
    }

    prepareOptions(url){
        return new Promise((res, rej)=>{
            TokenStorage.getBearerPromise().then((bearer)=>{
                res({
                    url: this.apiUrl + '/' + url,
                    headers:{
                        'Authorization':`Bearer ${bearer}`
                    }
                });
            });
        });
    }

    get(url, params){
        return this.prepareOptions(url).then((options)=>{
            return this.transport.get(options.url, params, options);
        })
    }

    post(url, data){
        return this.prepareOptions(url).then((options)=>{
            return this.transport.post(options.url, data, options);
        })
    }
}

export default BaseApiClient;
