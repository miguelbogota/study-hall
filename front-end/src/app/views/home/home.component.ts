import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  comments = [
    {
      name: 'Natalia',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      text: 'Me gusta mucho la institucion, es una de las mejores.',
      createdAt: 'Ultima actualización hace 3 min'
    },
    {
      name: 'Luis',
      photoUrl: 'https://images.unsplash.com/photo-1567168539593-59673ababaae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      text: 'De las mejores clases virtuales que he tenido.',
      createdAt: 'Ultima actualización hace 5 horas'
    },
    {
      name: 'Claudia',
      photoUrl: 'https://images.unsplash.com/photo-1517256673644-36ad11246d21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      text: 'Me gusta mucho la institucion, es una de las mejores.',
      createdAt: 'Ultima actualización hace 2 dias'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
