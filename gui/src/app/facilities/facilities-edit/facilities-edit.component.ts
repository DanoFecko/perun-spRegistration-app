import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../core/services/config.service";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
import {ApplicationItemComponent} from "../../requests/new-request/application-item/application-item.component";
import {ApplicationItem} from "../../core/models/ApplicationItem";
import {PerunAttribute} from "../../core/models/PerunAttribute";
import {FacilitiesService} from "../../core/services/facilities.service";
import {Facility} from "../../core/models/Facility";

@Component({
  selector: 'app-facilities-edit',
  templateUrl: './facilities-edit.component.html',
  styleUrls: ['./facilities-edit.component.scss']
})
export class FacilitiesEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private facilityService: FacilitiesService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router) {
  }

  @ViewChildren(ApplicationItemComponent)
  items: QueryList<ApplicationItemComponent>;

  private sub: any;
  isFormVisible = false;
  isCardBodyVisible = false;
  loading = true;
  snackBarDurationMs = 8000;

  facility: Facility;

  // translations
  errorText: string;
  successfullySubmittedText: string;
  successActionText: string;

  applicationItems: ApplicationItem[];

  ngOnInit() {
    this.translate.get('FACILITIES.NEW_VALUES_ERROR_MESSAGE')
      .subscribe(value => this.errorText = value);
    this.translate.get('FACILITIES.SUCCESSFULLY_SUBMITTED_MESSAGE')
      .subscribe(value => this.successfullySubmittedText = value);
    this.translate.get('FACILITIES.SUCCESSFULLY_SUBMITTED_ACTION')
      .subscribe(value => this.successActionText = value);
    this.getAttributes();
  }


  revealForm() {
    this.loading = false;
    this.isCardBodyVisible = true;
    this.isFormVisible = true;
  }


  onLoading() {
    this.loading = true;
    this.isCardBodyVisible = false;
  }


  submitRequest() {

    let perunAttributes: PerunAttribute[] = [];

    this.items.forEach(i => {
      let attr = i.getAttribute();
      let perunAttr = new PerunAttribute(attr.value, attr.urn);
      perunAttributes.push(perunAttr);
    });

    console.log(perunAttributes);

    this.facilityService.changeFacility(this.facility.id, perunAttributes).subscribe(requestId => {
      let snackBarRef = this.snackBar
        .open(this.successfullySubmittedText, this.successActionText, {duration: this.snackBarDurationMs});
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/requests/detail/' + requestId]);
      });
      this.router.navigate(['/']);
    });
  }


  private static filterItems(items: ApplicationItem[]): ApplicationItem[] {

    let filteredItems: ApplicationItem[] = [];

    items.forEach(item => {
      if (item.displayed) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  }


  private getAttributes(): void {
    this.sub = this.route.params.subscribe(params => {
      this.facilityService.getFacilityWithInputs(params['id']).subscribe(facility => {
        this.facility = facility;

        this.applicationItems = [];
        for (const [key, value] of Object.entries(this.facility.attrs)) {
          value.input.oldValue = value.value;
          value.input.comment = value.comment;
          this.applicationItems.push(value.input);
          value.input.isEdit = false;
        }

        this.applicationItems = FacilitiesEditComponent.filterItems(this.applicationItems);
        this.revealForm();

        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
    });
  }
}

