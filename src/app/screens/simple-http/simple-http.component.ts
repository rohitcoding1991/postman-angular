
import { HttpserviceService } from "./httpservice.service";
import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
import {FormArray,FormBuilder,FormControl,FormGroup,Validators,} from "@angular/forms";




@Component({
  selector: "app-simple-http",
  templateUrl: "./simple-http.component.html",
  styleUrls: ["./simple-http.component.css"],
})
export class SimpleHttpComponent {
  recentUrls: string[] = [];
  addEditForm = new FormGroup({});
  responsee: boolean;
  response: any;
  myForm: FormGroup;
  submitted = false;
  public headerForm: FormGroup;
  showRemoveButton: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private httpserviceService: HttpserviceService
  ) {
    this.addEditForm = this.formBuilder.group({
      method: ["GET", Validators.required],
      url: ["", Validators.required],
      type: ["body", Validators.required],
      contentType: ["application/json"],
      jsonTextArea: [""],
      headers: {},
      body: {},
    });
    this.initForm();
  }

  ngOnInit() {
   
    const storedUrls = localStorage.getItem("recentUrls");
    if (storedUrls) {
      this.recentUrls = JSON.parse(storedUrls);
    }
    this.subscribeToFormArrayChanges("headers");
    this.subscribeToFormArrayChanges("bodys");
    this.subscribeToFormArrayChanges("params");
    this.addTab();
  }

  private subscribeToFormArrayChanges(arrayName: string): void {
    (this.addEditForm.get(arrayName) as FormArray).valueChanges.subscribe(
      (result) => {
        let lastItem = result[result.length - 1];
        if (lastItem.key) {
          this.custonAddElementInArray(arrayName);
        }});}

  initForm() {
    const reg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
    this.addEditForm = this.formBuilder.group({
      method: new FormControl("GET"),
      url: new FormControl("", [Validators.required, Validators.pattern(reg)]),
      contentType: new FormControl("application/json"),
      type: new FormControl("body"),
      jsonTextArea: new FormControl(""),
      headers: this.formBuilder.array([this.CreateCustomKeyValue()]),
      bodys: this.formBuilder.array([this.CreateCustomKeyValue()]),
      params: this.formBuilder.array([this.CreateCustomKeyValue()]),
    });

    this.myForm = this.formBuilder.group({
      tabs: this.formBuilder.array([]),
    });
  }

  CreateCustomKeyValue() {
    return this.formBuilder.group({
      key: new FormControl(""),
      value: new FormControl(""),
    });
  }

  getValidity(i) {
    return this.custonFormArray("headers").controls[i].invalid;
  }

  headerControls() {
    return this.addEditForm.get("headers")["controls"];
  }
  custonFormArray(formArrayName: string): FormArray {
    return this.addEditForm.get(formArrayName) as FormArray;
  }
  custonAddElementInArray(formArray): void {
    this.custonFormArray(formArray).push(this.CreateCustomKeyValue());
  }
  removeBody(i: number, formArray: string) {
    this.custonFormArray(formArray).removeAt(i);
  }
  onSubmit() {
    this.submitted = true;
    if (this.addEditForm.invalid) {
      return;
    }

    const url = this.addEditForm.value.url;
    const method = this.addEditForm.value.method;
    const body = this.addEditForm.value.jsonTextArea;

    // Send the HTTP request
    this.httpserviceService.sendRequest(url, method, body).subscribe(
      (res) => {
        // Store the last accessed API URL
        const lastApiUrl = url;
        localStorage.setItem("lastApiUrl", lastApiUrl);

        // Retrieve recentUrls array from localStorage or initialize it to an empty array
        let recentUrls = JSON.parse(localStorage.getItem("recentUrls")) || [];

        // Check if the URL already exists in the recentUrls array
        if (!recentUrls.includes(lastApiUrl)) {
          // Push the last accessed API URL to the recentUrls array
          recentUrls.push(lastApiUrl);
          localStorage.setItem("recentUrls", JSON.stringify(recentUrls));
          console.log("Recent URLs:", recentUrls);
          window.location.reload()
        } else {
          console.log("URL already exists in recent URLs:", lastApiUrl);
         
        }

        this.ngxLoader.start();

        setTimeout(() => {
          this.response = res;

          this.ngxLoader.stop();
        }, 500);
      },
      (error) => {
        console.error("Error:", error);

        this.ngxLoader.stop();
      }
    );
  }
  validation_messages = {
    url: [{ type: "required", message: "Please enter valid URL" }],
  };

  get tabs() {
    return this.myForm.get("tabs") as FormArray;
  }

  addTab() {
    this.tabs.push(
      this.formBuilder.group({
        title: ["Untitle Request"], // default title
      })
    );
  }

  removeTab(index: number) {
    this.tabs.removeAt(index);
  }
  activeSection: string = "";
  toggleSection(section: string) {
    this.activeSection = section === this.activeSection ? section : section;
  }
}