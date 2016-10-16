const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY';
const EXPIRE_DATE_KEY = 'EXPIRE_DATE_KEY';

class TokenStorage {
    constructor(){
        this.storage = new Map();
    }

    putBearer(accessToken, expiresIn, refreshToken) {
        this.storage[ACCESS_TOKEN_KEY] = accessToken;
        this.storage[REFRESH_TOKEN_KEY] = refreshToken;

        var now = new Date();
        now.setSeconds(now.getSeconds() + expiresIn);
        this.storage[EXPIRE_DATE_KEY] = now;
    }

    getBearerPromise() {
        var promise = new Promise((res, rej)=> {
            var accessToken = this.storage[ACCESS_TOKEN_KEY];

            if (!accessToken) {
                rej('no access token');
            } else {
                res(accessToken);
            }
        });

        return promise;
    }
}

const tokenStorage =  new TokenStorage();
tokenStorage.putBearer("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4MDMzMGU1Yjg3YzI2NzVjZDRiYmQyZSIsImlhdCI6MTQ3NjYwNDE2N30.oLEaD-Gskl6BCVfw2VmZd-2VDx5OICj6kh68sDvo9t4");

export default tokenStorage;
