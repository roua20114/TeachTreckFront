import { Component, OnInit } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  private stompClient: any;
  message: string = '';
  messages: { sender: string, content: string }[] = [];
  userRole: 'TEACHER' | 'STUDENT' = 'STUDENT';
  ngZone: any;

  ngOnInit(): void {
    this.connect();
  }

  connect() {
    const socket = new WebSocket('ws://localhost:8081/chat');
  
    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(JSON.stringify({ sender: 'TEST', content: 'Hello Server!' }));
    };
  
    socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
      const msg = JSON.parse(event.data);
      this.ngZone.run(() => {
        this.messages.push(msg);
      });
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }
  


  sendMessage() {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('WebSocket is not connected.');
      return;
    }
  
    if (this.message) {
      const msg = { sender: this.userRole, content: this.message };
      this.stompClient.publish({ destination: '/app/sendMessage', body: JSON.stringify(msg) });
      this.message = '';
    }
  }
  
 
}
