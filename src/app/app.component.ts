import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component } from '@angular/core';
// import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'angularChatBot';
  colorBackRight: string = '#3b8dbd';
  colorFontRight: string = '#ffffff';
  colorBackLeft: string = '#eeeeee';
  colorFontLeft: string = '#343a40';
  messages = [];

}
