import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})
export class MedicalRecordsComponent implements AfterViewInit {
  displayedColumns: string[] = ['filename', 'dateUploaded'];
  dataSource = new MatTableDataSource<MedicalRecord>(ELEMENT_DATA);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  constructor() { }
}

export interface MedicalRecord {
  filename: string;
  dateUploaded: string;
}

const ELEMENT_DATA: MedicalRecord[] = [
  {filename: 'medical-record-example.pdf', dateUploaded: new Date().toDateString()},
  {filename: 'medical-record-example.pdf', dateUploaded: new Date().toDateString()},
  {filename: 'medical-record-example.pdf', dateUploaded: new Date().toDateString()}
];
