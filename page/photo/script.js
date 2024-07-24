document.addEventListener("DOMContentLoaded", function() {
    const galleryContainer = document.querySelector(".gallery");

    const firebaseConfig = {
        apiKey: "AIzaSyCAPtx8xC1zfS3QSCVbvpdzAUuB_JOPkyY",
        authDomain: "mywebsite-e5e18.firebaseapp.com",
        projectId: "mywebsite-e5e18",
        storageBucket: "mywebsite-e5e18.appspot.com",
        messagingSenderId: "668146964047",
        appId: "1:668146964047:web:37e32753d372e83877bc3a",
        measurementId: "G-1JJX27DEG0"
      };
  
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
    // Create a storage referencex
    const storage = firebase.storage();
    const storageRef = storage.ref();
  
    // Function to fetch images from Firebase Storage
    function fetchImages() {
        storageRef.child('gs://mywebsite-e5e18.appspot.com').listAll()
            .then(function(res) {
                res.items.forEach(function(itemRef) {
                    itemRef.getDownloadURL().then(function(url) {
                        const imgContainer = document.createElement("div");
                        imgContainer.className = "img-container";
                        const imgElement = document.createElement("img");
                        imgElement.src = url;
                        imgContainer.appendChild(imgElement);
                        galleryContainer.appendChild(imgContainer);
                    }).catch(function(error) {
                        console.log(error);
                    });
                });
            }).catch(function(error) {
                console.log(error);
            });
    }

    fetchImages();
});
