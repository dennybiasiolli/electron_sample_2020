var dynamicParagraph = document.getElementById('dynamicParagraph');
setTimeout(function () {
  dynamicParagraph.innerHTML = '...it change after 2 seconds!';
}, 2000);
