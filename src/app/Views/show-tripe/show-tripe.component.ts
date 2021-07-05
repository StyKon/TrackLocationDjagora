import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarModule } from 'src/app/Models/car/car.module';
import { UserModule } from 'src/app/Models/user/user.module';
import { AuthService } from 'src/app/Services/auth.service';
import { LocationService } from 'src/app/Services/location.service';
import { UserService } from 'src/app/Services/user.service';
declare var google;
@Component({
  selector: 'app-show-tripe',
  templateUrl: './show-tripe.component.html',
  styleUrls: ['./show-tripe.component.css']
})
export class ShowTripeComponent implements OnInit {
  userId: any;
  locId: any;
  lat: number;
  map: any;
  long: number;
  speed: number;
  @ViewChild('style-map') mapElement: ElementRef;
  user: Observable<UserModule>;
  car: CarModule[];
  constructor(private router: Router, private route: ActivatedRoute,
    private locationService: LocationService,
    private authService: AuthService,
              private userService: UserService
               ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
        this.userId = param.id_user,
        this.locId = param.loc_id;
    });
    this.ShowTrack(this.userId, this.locId);
    this.ShowCarInformation(this.userId, this.locId);
    this.ShowUserInformation(this.userId);
  }
  ShowUserInformation(userId: any) {
    this.user = this.userService.getUserById(userId);
    return this.user;
  }
  ShowCarInformation(userId: any, locId: any ) {
   return  this.locationService.getTrackingByUser(userId, locId).subscribe(
      res => {
        this.car = res.car;
      });

  }


  ShowTrack(userId: any, locId: any) {
    setTimeout(() => {
    const mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.locationService.getTrackingByUser(userId, locId).subscribe(
      res => {
        this.lat = res.Latitude;
        this.long = res.Longitude;
        this.speed = res.Speed;
        setTimeout(() => {
          const latLng = new google.maps.LatLng(this.lat, this.long);
          this.map.setCenter(latLng);
          this.map.setZoom(16);
          google.maps.Marker({
            icon: '../../../assets/assets/images/marker.png',
            position: latLng,
            map: this.map,
            title: `Speed : ${this.speed}`,
          });
        }, 5000);
      });
    }, 5000);
  }
}
