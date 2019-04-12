import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../providers/groceries-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public alertController: AlertController, public toastController: ToastController, 
    public groceriesService: GroceriesServiceService, private socialSharing: SocialSharing) { }

  toggle(item: any) {
    item.purchased = !item.purchased
  }

  loadItems() {
    return this.groceriesService.items;
  }

  async delete(item: any) {
    const toast = await this.toastController.create({
      message: "Removing item: " + item.Name + ", " + item.Type,
      duration: 3000
    })

    toast.present();
    this.groceriesService.removeItem(item);
  }

  async addItem() {
    const alert = await this.alertController.create({
      subHeader: 'Add Item',
      message: 'Please add an item.',
      inputs: [
        {
          name: 'itemName',
          type: 'text',
          placeholder: 'Name of item, e.g. "apples"'
        },
        {
          name: 'itemType',
          type: 'text',
          placeholder: 'Type of item, e.g. "granny smith'
        }],
      buttons: [{
        text: "Add",
        handler: data => {
          this.groceriesService.addItem(data);
        }
      },
      {
        text: "Cancel"
      }]
    });

    alert.present();
  }

  async editItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Editing item - ' + index + "...",
      duration: 3000
    })
    toast.present();
    this.showEditItemPrompt(item, index);
  }

  async shareItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Sharing item - ' + index + "...",
      duration: 3000
    })
    toast.present();
    let message = "Grocery Item - Name: "+ item.name
    let subject = "Shared Via Groceries App."
    this.socialSharing.share(message, subject).then(() => {
      console.log('Shared successfully!')
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });
  }

  async showEditItemPrompt(item, index) {
    const editAlert = await this.alertController.create({
      subHeader: 'Edit Item',
      message: 'Please edit item...',
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: item.Name
        },
        {
          name: "type",
          placeholder: 'type',
          value: item.Type
        },
      ],
      buttons: [{
        text: 'Cancel'
      },
      {
        text: 'Save',
        handler: data => {
          this.groceriesService.editItem(data, index)
        }
      },
      ]
    });
    editAlert.present()
  }
}
