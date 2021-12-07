import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductResponse } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  displayedColums = ['image', 'name', 'price', 'stock', 'action']

  dataSource = new MatTableDataSource<Product>();

  textSearch: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private networkService: NetworkService) {}
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;


    this.feedData();
  }

  feedData() {
    
    this.networkService.getProducts().subscribe(
      (data: any) => {
        this.dataSource.data = data.map(item => {
          item.image = this.networkService.getProductImageURL(item.image)
          return item;
        })
      },
      (error: any) => {
        console.log(JSON.stringify(error.error.message))
      },
      () => {
        console.log("feed network done")
      }
    )



  }

  search(event: Event) {
    let filtervalue = '';
    if (event) {
      filtervalue = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search(null as any)
  }

  onClickDeleteProduct(product: ProductResponse) {
    //confirm
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete Product: ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.networkService.deleteProduct(product.id).subscribe(
          data => {            
            this.feedData()

          },
          error => {
            console.log(JSON.stringify(error.error.message))
          }
        )
      }
    })
  }
}
