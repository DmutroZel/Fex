
   
$(document).ready(function() {
    const body = document.body;
    const leafCount = 15;
    const leafTypes = [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%2343A047' d='M50,90c0,0-45-45-45-45S50,0,50,0s45,45,45,45S50,90,50,90z'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%234CAF50' d='M95,50c-25,25-45,25-45,25s0-20-25-45S0,5,0,5s25,0,50,25S95,50,95,50z'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle fill='%238BC34A' cx='50' cy='50' r='40'/%3E%3Cpath fill='none' stroke='%2376C043' stroke-width='5' d='M30,50c0,0,10-20,40,0c-30,20-40,0-40,0z'/%3E%3C/svg%3E"
    ];
    
    for (let i = 0; i < leafCount; i++) {
      const leaf = $('<div></div>').addClass('leaf');
      $(leaf).css({
        'background-image': `url(${leafTypes[Math.floor(Math.random() * leafTypes.length)]})`,
        'left': `${Math.random() * 100}%`,
        'top': `${Math.random() * 100}%`,
        'animation-delay': `${Math.random() * 10}s`,
        'animation-duration': `${15 + Math.random() * 15}s`,
        'opacity': `${0.1 + Math.random() * 0.2}`,
        'transform': `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`
      });
      $('body').append(leaf);
    }
    
    $('#upload').click(function() {
      if (!$('#file')[0].files[0]) {
        alert('Будь ласка, виберіть файл!');
        return;
      }
    
      const formData = new FormData();
      formData.append('file', $('#file')[0].files[0]);
    
      $('#currentCode').text('Завантаження...')
        .css('animation', 'codePulse 1s infinite alternate');
    
      axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        $('#currentCode')
          .text('Ваш код: ' + res.data.code)
          .css('animation', 'codeSuccess 2s');
        
        setTimeout(() => {
          $('#currentCode').css('animation', 'codeFade 5s infinite alternate');
        }, 2000);
      })
      .catch(err => {
        console.error(err);
        $('#currentCode')
          .text('Помилка: ' + (err.response?.data?.error || 'Щось пішло не так'))
          .css('color', '#ffaaaa')
          .css('animation', 'codeError 2s infinite alternate');
      });
    });
    
    $('#download').click(function() {
      let code = $('#downloadCode').val();
      
      if (!code) {
        alert('Будь ласка, введіть код!');
        return;
      }
      
      axios.get(`http://localhost:3000/download/${code}`)
        .then(res => {
          if ($('#downloadedFile').length === 0) {
            $('.wrap').append('<div class="image-container"><img id="downloadedFile" alt="Завантажений файл"></div>');
          }
          
          $('#downloadedFile').attr('src', `http://localhost:3000/uploads/${res.data.file}`);
          $('#downloadedFile').css('animation', 'imageFadeIn 1s');
        })
        .catch(err => {
          console.error(err);
          alert('Помилка: ' + (err.response?.data?.error || 'Файл не знайдено'));
        });
    });
    
    $('#file').change(function() {
      if (this.files[0]) {
        const fileName = this.files[0].name;
        $(this).addClass('file-selected');
        $('#currentCode')
          .text('Вибраний файл: ' + fileName)
          .css('animation', 'fileSelected 1s');
      }
    });
  });




  // $('#upload').click(function () {
  
//     let data = {
//         file: $('#file')[0].files[0]
//     }
//     axios.post('http://localhost:3000/upload', data, 
//     { headers: { 'Content-Type': 'multipart/form-data' } })
//     .then(res => {
//         $('#currnetCode').text(res.data.code);
//     }
//     )
//     .catch(err => console.error(err));
//     alert('File uploaded successfully');
// });
// $('#download').click(function () {
//     let code = $('#code').val();
//     axios.get(`http://localhost:3000/download/${code}`)
//     .then(res => {
//         $('#downloadedFile').attr('src', `http://localhost:3000/uploads/${res.data.file}`);
//     })
//     .catch(err => console.error(err));
// });  