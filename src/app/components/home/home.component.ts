import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:ServiceService) { }

  ngOnInit(): void {
  }



  }



