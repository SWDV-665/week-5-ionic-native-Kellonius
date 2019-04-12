import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items = []
  // { Name: "Apples", Type: "Granny Smith", src: "/assets/apples.jpg", purchased: false },
  // { Name: "Bananas", Type: "Yellow", src: "/assets/bananas.jpg", purchased: false },
  // { Name: "Blueberries", Type: "Highbush", src: "/assets/blueberry.jpg", purchased: false },
  // { Name: "Strawberries", Type: "June Bearing", src: "/assets/strawberry.jpg", purchased: false }]

  constructor() { }

  removeItem(item: any) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  addItem(data: any) {
    this.items.push({ Name: data.itemName, Type: data.itemType, src: "/assets/404.jpg", purchased: false })
  }

  editItem(item: any, index: number) {
    this.items[index].Name = item.name;
    this.items[index].Type = item.type;
  }
}
