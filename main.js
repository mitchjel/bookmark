// Creation of event listener for submit button
document.querySelector("#idForm").addEventListener("submit",saveBookmark);
// Event Listener for Search Bookmark....
document.querySelector("#filter").addEventListener("keyup",filterBookmarks);

        // Filter Bookmarks

function filterBookmarks(){
 var filterValue = document.querySelector("#filter").value.toUpperCase();
 var bookmarkNames = document.querySelectorAll(".name");
 for (var i=0; i < bookmarkNames.length; i++){
    var name = bookmarkNames[i].textContent.toUpperCase();
     if (name.includes(filterValue)){
        bookmarkNames[i].parentElement.style.display = "block";
     }
         else {
        bookmarkNames[i].parentElement.style.display = "none";
        }
    }
}

// saving bookmarks
function saveBookmark(event){
    // prevent from reloading page after submit bookmark
    event.preventDefault();
    // get user id and url inputs
    var siteName = document.querySelector("#siteName").value;
  
   var siteUrl = document.getElementById("siteUrl").value;

   // Creation object for bookmark
   var bookmark = {
            name: siteName,
            url: siteUrl
   };

   // Checking if name or url is empty
   if (siteName === "" || siteUrl === ""){

    alert ("site name and url can not be empty");
    return false;
   }

    // adding user inputs to the local storage

 // localStorage.setItem("test", "Hello There!");
  //console.log(localStorage.getItem("test"));

  // store bookmark array into local storage

  if (localStorage.getItem("bookmarks") === null){

    // initialize bookmarks array
    var bookmarks = [];

     // adding the new bookmark

bookmarks.push(bookmark);
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
    else {
        // get the bookmark from local storage
  var bookmarks = JSON. parse(localStorage.getItem('bookmarks'));
        // Add new bookmark to local Storage
        bookmarks.push(bookmark);
        // reset bookmarks to local Storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    // reset the form

    document.querySelector("#idForm").reset();
    // adding bookmarks to the form page
    fetchBookmarks();
}
   // Fetching Bookmarks 

    function fetchBookmarks (){
    // Getting bookmarks from the local Storage
        var bookmarks = JSON.parse(localStorage.getItem     
            ("bookmarks"));
// Get user inputs
var bookmarksResult = document.querySelector("#bookmarksResult");
// Adding bookmarks to the bottom of the page
 console.log(bookmarksResult);
// Reset output div
bookmarksResult.innerHTML = "";
// Have a loop to add bookmarks onto the form 
for (var i=0; i <bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

// Create div

var div = document.createElement("div");
var h3 = document.createElement("h3");
h3.textContent = name;
h3.className = "name";

// Create Link
var a = document.createElement("a");
a.href = url;
a.className = "btn btn-success";
a.textContent = "Visit";
 // Create Button
var button = document.createElement ("button");
button.className = "btn btn-danger";
button.textContent = "Delete";
// Add Event Listen to the delete button
button.addEventListener("click", function (e){
  var siteName = e.target.parentElement.children[0].textContent;
  deleteBookmarks(siteName);
});
    div.appendChild(h3);
    div.appendChild(a);
    div.appendChild(button);
    bookmarksResult.append(div);
  }
}

function deleteBookmarks (name){
// Get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem     
    ("bookmarks"));
    // loop thorugh bookmarks
    for (var i=0; bookmarks.length; i++){
// checking for given name on bookmarks and then delete it
if (bookmarks[i].name === name){
    bookmarks.splice(i,1);
    break;
        }
    
     }  
     // Putting bookmarks back to local Storage
     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
     fetchBookmarks(); 

    }
