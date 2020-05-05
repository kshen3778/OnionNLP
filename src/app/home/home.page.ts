import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text: any;
  title: any;
  url: any;
  language: any;
  nval: any;

  constructor(private http: HttpClient) {
    this.text = "";
    this.title = "";
    this.nval = 1;
  }

  getArticle(){
    console.log("URL: " + this.url);
    console.log("Language: " + this.language);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let data = {
      "url": this.url,
      "language": this.language
    };

    this.http
    .post("http://127.0.0.1:5000/get_article", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      (res: any) => {
        this.title = res.title;
        this.text = "Please Wait. Analyzing Text ... ";

        console.log(this.nval);
        //Summarization
        let sum_data = {
          "text": res.text,
          "select_n": parseInt(this.nval)
        }
        this.http.post("http://127.0.0.1:5000/api", sum_data, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).subscribe( (res2: any) => {
            console.log(res2);
            let toDisplay = res2.join(". \r\n");
            this.text = toDisplay;

          },
          (err2: HttpErrorResponse) => {
            console.log(err2.error);
            console.log(err2.name);
            console.log(err2.message);
            console.log(err2.status);
          }

        );


      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

}
