export class Request {
    constructor(url) {
        this.url = url;
    }

    async get(){ // olan veriyi çekme
        const response = await fetch(this.url);
        const responseData = await response.json();
        return responseData; // promise döncek
    }

    async post(data){ // yeni veri ekleme

        const response = await fetch(this.url,{
            method : "POST",
            body : JSON.stringify(data),
            headers : {
                "Content-type": "application/json; charset=UTF-8"
              }
        });
        const responseData = await response.json();
        return responseData; // promise döncek
    }

    async put(id,data){ // veriyi güncelleme

        const response = await fetch(this.url + "/" + id,{
            method : "PUT",
            body : JSON.stringify(data),
            headers : {
                "Content-type": "application/json; charset=UTF-8"
              }
        });
        const responseData = await response.json();
        return responseData; // promise döncek
    }

    async delete(id){ // silme

        const response = await fetch(this.url + "/" + id,{
            method : "DELETE"
        });
        
        return "Veri silindi"; // mesaj döncek
    }
}