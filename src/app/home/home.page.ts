import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text: string;
  title: string;
  url: string;
  language: string;

  constructor(private http: HttpClient) {
    this.text = "";
    this.title = "";
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
    }

    this.http
    .post("http://127.0.0.1:5000/get_article", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      res => {
        console.log(res);
        this.title = res.title;
        this.text = "Please Wait. Analyzing Text ... ";

        //Summarization
        let sum_data = {
          "text": res.text,
          "select_n": 5
        }
        this.http.post("http://127.0.0.1:5000/api", sum_data, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).subscribe(res2 => {
            this.text = res2

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
