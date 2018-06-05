import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/Observable/dom/WebSocketSubject';

export class Message {
    constructor(
        public sender: string,
        public content: string,
        public isBroadcast = false
    ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
