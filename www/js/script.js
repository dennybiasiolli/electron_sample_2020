var dynamicParagraph = document.getElementById('dynamicParagraph');
setTimeout(function () {
  dynamicParagraph.innerHTML = '...it change after 2 seconds!';
}, 2000);

// notifications
const btnNotification = document.getElementById('btnNotification');
btnNotification.onclick = () => {
  let myNotification = new Notification('Title', {
    body: 'Lorem Ipsum Dolor Sit Amet'
  })
  myNotification.onclick = () => {
    console.log('Notification clicked')
  }
}
