import { Component, OnInit } from '@angular/core';
import {ITicket} from '../../model/ticket';
import {FormGroup} from '@angular/forms';
import {TicketService} from '../../services/ticket.service';

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
    status: '',
    createdBy: '',
    createdOn: ''
  };

  tickets: Array<ITicket>;

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(public ticketService: TicketService) {
    this.ticketService.getTickets()
      .subscribe(tickets => {
        console.log('DATA:' + tickets);
        this.rows = tickets.Items;
        console.log('ROWS:' + this.rows);
      });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {

    this.ticketForm = form;
    console.log(form);

  }

}
