import { Component, OnInit } from '@angular/core';

require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');


@Component({
  selector: 'app-pdfmaker',
  templateUrl: './pdfmaker.component.html',
  styleUrls: ['./pdfmaker.component.css']
})
export class PdfmakerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
