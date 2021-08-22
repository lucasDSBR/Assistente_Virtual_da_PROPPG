import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from '../model/message.model';
import { TextMessage } from '../model/text-messsage.model';
import { ResponseMessage } from '../model/response-message.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  BACK_ENABLED: boolean = true;
  
  @Input('messages') messages: Message[];
  @Input('colorBackRight') colorBackRight: string;
  @Input('colorFontRight') colorFontRight: string;
  @Input('colorBackLeft') colorBackLeft: string;
  @Input('colorFontLeft') colorFontLeft: string;

  textInput = '';
  
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    let newMessageInit: Message = { text: "👋😃Olá, me chamo BALINU. Sou o Assistente Virtual da PROPPG. Estou em uma versão inicial, mas já consigo te ajudar em muitas questões. Vamos lá? Como posso ajudar?", date: "", userOwner: false};
    this.messages.push(newMessageInit);

    (function(){
      $('.closeChat').on('init',function(e) {
    
        e.preventDefault();
        $('#conteinerAssistente').fadeOut(300);
    
      });
    })();

    (function() {
      window.onload = function() {
    
        $('.mensagensChat').slideToggle(0, 'swing');
        $('.list-messages').fadeToggle(0, 'swing');
        $('.enviar').fadeToggle(0, 'swing');
        
      };

      $('#chat-title header').on('click', function() {
    
        $('.mensagensChat').slideToggle(300, 'swing');
        $('.list-messages').fadeToggle(300, 'swing');
        $('.enviar').fadeToggle(300, 'swing');
        $('#alertaNews').fadeOut(0);
        
      });
    
      $('.closeChat').on('click', function(e) {
    
        e.preventDefault();
        $('#conteinerAssistente').fadeOut(300);
    
      });
    
    }) ();

    
    
  }


  sendMessage(){
    let newMessage: Message = { text: this.textInput, date: "", userOwner: true};
    if(this.textInput != ''){
      this.messages.push(newMessage);
      
      let messageBack: TextMessage = { "firstname": 'user', "text": this.textInput}
      if(this.BACK_ENABLED){
        this.chatService.sendMessage(messageBack)
        .subscribe((res: ResponseMessage) => {
          let messageReturn: Message = { text: res.responseMessage, date: new Date().toDateString(), userOwner: false}
          if(messageReturn){
            this.messages.push(messageReturn);
            $(document).ready(function() {
              var wtf = $('.list-messages');
              var height = wtf[0].scrollHeight;
              wtf.scrollTop(height);
            });
          }
          
          
        });
      }
      
      this.textInput = '';
    }
  }

  

  onKey(event: any){
    if(event.keyCode == 13){
      this.sendMessage();
    }
  }

 

}
