import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  //blogposts$:Observable<Blogpost[]>;
  allBlogposts:Blogpost[];

  constructor(private blogPostService:BlogpostService) { }
 
  ngOnInit(): void {
   // this.blogposts$ = this.blogPostService.getBlogPost();
     

    this.blogPostService
    .getBlogPost()
    .subscribe(data => {this.refresh(data)});

    this.blogPostService.handleBlogpostCreated()
    .subscribe(data => {
      console.log('Admin component received',data)
    })
  }

   deleteBlogpost(selectedOption){
     const ids = selectedOption.map(so => so.value);
     if(ids.length === 1){
      this.blogPostService
      .deleteSingleBlogPost(ids[0])
      .subscribe(data => this.refresh(data),err => console.error(err));
     } else {
       return this.blogPostService
       .deleteBlogposts(ids)
       .subscribe(data => this.refresh(data),err => this.handleError(err));
     }
    
  };

  refresh(data){
    console.log('data',data);
    this.blogPostService.getBlogPost().subscribe(data => {
      this.allBlogposts = data;
    })
  }

  handleError(error){
    console.error(error);
  }

}


