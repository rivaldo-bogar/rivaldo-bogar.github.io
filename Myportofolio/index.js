// Inisialisasi Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBmtj_WiommISSiG2paxFFrzjZUe-vRigM",
    authDomain: "mywebcomment-25527.firebaseapp.com",
    databaseURL: "https://mywebcomment-25527-default-rtdb.firebaseio.com",
    projectId: "mywebcomment-25527",
    storageBucket: "mywebcomment-25527.appspot.com",
    messagingSenderId: "817749660171",
    appId: "1:817749660171:web:562fcefc2d57abb7aaed0e"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Referensi database Firebase
  var database = firebase.database().ref('comments');
  
  // Fungsi untuk menampilkan komentar dari database
  function showComments(comments) {
    var commentsList = document.getElementById('comments');
    commentsList.innerHTML = '';
  
    comments.forEach(function(comment) {
      var li = document.createElement('li');
      li.classList.add('comment');
      li.innerHTML = `
        <span class="author">${comment.name}</span>
        <span class="email">${comment.email}</span>
        <p class="message">${comment.comment}</p>
      `;
      commentsList.appendChild(li);
    });
  }
  
  // Fungsi untuk menyimpan komentar ke database
  function saveComment(name, email, comment) {
    var newComment = {
      name: name,
      email: email,
      comment: comment
    };
  
    database.push(newComment);
  }
  
  // Event listener untuk pengiriman komentar
  document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var comment = document.getElementById('comment').value;
  
    saveComment(name, email, comment);
  
    document.getElementById('commentForm').reset();
  });
  
  // Mendengarkan perubahan pada database Firebase
  database.on('value', function(snapshot) {
    var comments = [];
  
    snapshot.forEach(function(childSnapshot) {
      var comment = childSnapshot.val();
      comments.push(comment);
    });
  
    showComments(comments);
  });