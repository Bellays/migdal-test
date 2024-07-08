import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Garage {
  Name: string;
  Address: string;
  City: string;
  Area: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  garages: Garage[] = [];
  filteredGarages: Garage[] = this.garages;
  loading: boolean = false;
  searchInput = '';
  success: boolean = true;
  areas: string[] = [];
  selectedArea = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadGarageAreas();
    this.loadGarages();
  }

  loadGarageAreas() {
    this.loading = true;
    const url = 'https://front.migdal.co.il/experts/api/garageareas';
  
    this.http.post<any>(url, null ).subscribe(
      (response) => {
        console.log(response);
        this.areas = response.Data;
        console.log(this.areas);
        // this.loading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }
  loadGarages() {
    this.loading = true;
    const url = 'https://front.migdal.co.il/experts/api/garagesdata';
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    };
 
    this.http.post<any>(url,{ headers }).subscribe(
      (response) => {
        console.log(response);
        this.garages = (response.Data as Garage[]).sort((a, b) => a.Name.localeCompare(b.Name));
        this.filteredGarages=this.garages;
        console.log(this.garages);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  // loadGarages() {
  //   this.loading = true;
  //   const jsonUrl = 'assets/garages.json';
  //   this.http.get<Garage[]>(jsonUrl).subscribe(
  //     (response) => {
  //       this.garages = response.sort((a, b) => a.Name.localeCompare(b.Name));
  //       this.filteredGarages = this.garages;
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.error('Error loading garages:', error);
  //       this.loading = false;
  //       this.success = false;
  //     }
  //   );
  // }

  applyFilters(value: string) {
    if (this.selectedArea) {
      this.filteredGarages = this.garages.filter(garage =>
        garage.City.includes(value) &&
        garage.Area == this.selectedArea
      );
    } else {
      this.filteredGarages = this.garages.filter(garage =>
        garage.City.includes(value)
      );
    }
  }

  onSearchInputChange() {
    setTimeout(() => {
      this.applyFilters(this.searchInput);
    }, 300);

  }

  onAreaSelectChange() {
    this.applyFilters(this.searchInput);
  }







}










