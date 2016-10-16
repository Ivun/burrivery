class HttpTransport {
    constructor(defaultOptions){
        this.defaultOptions = defaultOptions;
    }

    get(url, params, options){
        options = {...this.defaultOptions, ...options,
            method: 'GET'
        };


        url = this._addParamsToUrl(url, params);

        return fetch(url, options).then(resp=>{
            return resp.json();
        });
    }

    post(url, data, options){
        options = {...this.defaultOptions, ...options,
            body: data,
            method: 'POST'
        };

        return fetch(url, options).then(resp=>{
            return resp.json();
        });
    }

    _addParamsToUrl(url, paramsObj){
        const paramsString = this._escapedParams(paramsObj);

        if (!paramsString) return url;

        if (url.indexOf('?')){
            url += '&' + paramsString;
        }else{
            url += '?' + paramsString;
        }

        return url;
    }

    _escapedParams(params){
        var arr = []
        for(var key in params){
            arr.push(`${key}=${encodeURIComponent(params[key])}`);
        }

        return arr.join('&');
    }
}

export default HttpTransport;
