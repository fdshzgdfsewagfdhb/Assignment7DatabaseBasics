// Import the firebase app instance
import { db } from './firebase';  // load from firebase.js in same dir
// import functions from Firestore
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';



// Technically, this is not the code that went through the Esprima code validator, 
// I'm not sure why, but Esprima doesn't like “...doc.data()” 
// and I can't do anything about that. 

export async function getSortedPostsData() {
    // Get the reference to the 'posts' collection in Firestore
    const databaseRef = collection(db, 'posts');
    // Retrieve all documents (posts) from the collection
    const querySnapshot = await getDocs(databaseRef);
    // Convert the snapshot documents to a json object
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    
    // Sort the posts alphabetically by title using localeCompare
    jsonObj.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });
    // Return only the id, title, and date fields for each post
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            title: item.title,
            date: item.date,
        }
      });
}

export async function getAllPostIds() {
    // Get the reference to the 'posts' collection in Firestore
    const databaseRef = collection(db, 'posts');
    // Retrieve all documents (posts) from the collection
    const querySnapshot = await getDocs(databaseRef);
    // Convert the snapshot documents to an array of just IDs
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id}));

    // Return each ID wrapped in a { params: { id: … } } object
    return jsonObj.map(item => {
        return {
          params: {
            id: item.id.toString()
          }
        }
      });
}

export async function getPostData(id) {
    // Get the reference to the 'posts' collection in Firestore
    const databaseRef = collection(db, 'posts');
    // Build a query that matches the document with the provided id
    const searchQuery = query(databaseRef, where(documentId(), '==', id));
    // Retrieve the matching document(s)
    const querySnapshot = await getDocs(searchQuery);
    // Convert the result to a plain object with { id, title, date, contentHtml }
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));

    // If no post was found, return a placeholder object
    if (jsonObj.length === 0) {
        return {
          id: id,
          title: 'Not found',
          date: '',
          contentHtml: 'Not found',
        }
      } else {
        // Return the first (and only) post data
        return jsonObj[0];
      }
}