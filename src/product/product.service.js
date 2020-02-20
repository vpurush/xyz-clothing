import request from 'request';

const API_BASE_URI = "http://localhost:3000/data";

const FetchProducts = () => {
    return new Promise((resolve, reject) => {
        request({
            url: `${API_BASE_URI}/products.json`,
            method: 'GET'
        }, (err, response, body) => {
            if(err){
                reject(err);
                console.error(err);
                return;
            }

            resolve(JSON.parse(body));
        });
    });
}

export default {
    FetchProducts
}