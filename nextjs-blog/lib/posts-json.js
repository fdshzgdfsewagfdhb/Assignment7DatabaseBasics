//imports
import fs from 'fs';
import path from 'path';
// this is the path to the data folder
const dataDir = path.join(process.cwd(), 'data');

//This is the refactored code. It gets the raw data from the post.json file 
// and returns it to the function one called. 
export function loadPostsData() {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
}

// this function gets, sorts and returns the data from the posts.json 
// it returns the posts id, title, and date, sorted by title
export function getSortedPostsData() {
    const jsonObj = loadPostsData();
    jsonObj.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });
    return jsonObj.map(item => {
        return {
          id: item.id.toString(),
          title: item.title,
          date: item.date
        }
      });

}
// this function gets and returns the ID from a post posts.json
// so that other components know what the ID is for each post, and can use it to get the data for that post
export function getAllPostIds() {
    const jsonObj = loadPostsData();
    return jsonObj.map(item => {
        return {
          params: {
            id: item.id.toString()
          }
        }
      });
}
// this function gets an Id and returns the data for that post, 
// if the post is not found it returns a not found object
export function getPostData(id) {
    const jsonObj = loadPostsData();
    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
      });
    if (objReturned.length === 0) {
        return {
          id: id,
          title: 'Not found',
          date: '',
          contentHtml: 'Not found'
        }
      } else {
        return objReturned[0];
      }
}