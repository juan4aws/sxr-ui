import { Component, OnInit } from '@angular/core';
import {ITicket} from '../../model/ticket';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  ticketForm: FormGroup;

  model: ITicket = {
    id: 0,
    description: '',
    assigned: '',
    priority: '',
    status: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {

    this.ticketForm = form;
    console.log(form);

  }

}