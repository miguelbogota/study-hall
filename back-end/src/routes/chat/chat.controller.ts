import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ChatInterface } from './models/chat.interface';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('chats')
export class ChatController {

  constructor(
    private chatService: ChatService
  ) { }

  @Get('/')
  getChats(): Observable<ChatInterface[] | unknown> {
    return this.chatService.getChats();
  }

  @Get('/:groupId')
  getChatdFromGroup(@Param('groupId') groupId: string): Observable<ChatInterface[] | unknown> {
    return this.chatService.getChats()
      .pipe(
        map((c: ChatInterface[]) => c.filter(u => u.groupId === groupId))
      );
  }

  @Post('/')
  createChat(@Body() chat: ChatInterface): Observable<ChatInterface | unknown> {
    return this.chatService.createChat(chat);
  }

  @Put('/:chatId')
  updateChat(@Param('chatId') chatId: string, @Body() chat: ChatInterface): Observable<ChatInterface | unknown> {
    return this.chatService.updateChat(chatId, chat);
  }

  @Delete('/:chatId')
  deleteChat(@Param('chatId') chatId: string): Observable<ChatInterface | unknown> {
    return this.chatService.deleteChat(chatId);
  }

}
