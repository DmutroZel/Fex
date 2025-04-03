// $(document).ready(function() {
 
//   let currentUploadedFile = null;
  
 
//   function showPopup(message, type = 'info') {
//     const popup = $('#forest-popup');
//     const popupMessage = $('.forest-popup-message');
//     const popupIcon = $('.forest-popup-icon i');
    
   
//     popupMessage.text(message);
    
   
//     if (type === 'error') {
//       popup.addClass('forest-popup-error');
//       popupIcon.removeClass('fa-leaf fa-check').addClass('fa-exclamation-circle');
//     } else if (type === 'success') {
//       popup.addClass('forest-popup-success');
//       popupIcon.removeClass('fa-leaf fa-exclamation-circle').addClass('fa-check');
//     } else {
//       popup.removeClass('forest-popup-error forest-popup-success');
//       popupIcon.removeClass('fa-check fa-exclamation-circle').addClass('fa-leaf');
//     }
    
   
//     popup.addClass('forest-popup-show');
  
//     setTimeout(() => {
//       popup.removeClass('forest-popup-show');
//     }, 3000);
//   }
 
//   $('#upload').click(function() {
//     const fileInput = $('#file')[0];
//     const selectedFile = fileInput.files[0];
    
//     if (!selectedFile) {
//       showPopup('Будь ласка, виберіть файл!', 'error');
//       return;
//     }
    
  
//     if (currentUploadedFile && 
//         currentUploadedFile.name === selectedFile.name && 
//         currentUploadedFile.size === selectedFile.size && 
//         currentUploadedFile.lastModified === selectedFile.lastModified) {
//       showPopup('Цей файл вже було завантажено. Виберіть інший файл.', );
//       return;
//     }
    
//     const formData = new FormData();
//     formData.append('file', selectedFile);
    
   
//     axios.post('http://localhost:3000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//     .then(res => {
//       $('#currentCode')
//         .text('Ваш код: ' + res.data.code)
//         .css('animation', 'codeSuccess 2s');
      
//       setTimeout(() => {
//         $('#currentCode').css('animation', 'codeFade 5s infinite alternate');
//       }, 2000);
      
      
//       currentUploadedFile = selectedFile;
      
     
//       $('#upload').prop('disabled', true).addClass('button-disabled')
//         .html('Файл завантажено <i class="fas fa-check"></i>');
      
//       showPopup('Файл успішно завантажено!', 'success');
//     })
//     .catch(err => {
//       console.error(err);
//       $('#currentCode')
//         .text('Помилка: ' + ( 'Щось пішло не так'))
//         .css('color', '#ffaaaa')
//         .css('animation', 'codeError 2s infinite alternate');
      
    
      
      
//       showPopup('Помилка: ' + ('Щось пішло не так'), 'error');
//     });
//   });
  

// $('#download').click(function() {
//   let code = $('#downloadCode').val();
  
//   if (!code) {
//     showPopup('Будь ласка, введіть код!', 'error');
//     return;
//   }
  
//   axios.get(`http://localhost:3000/download/${code}`, {
//     responseType: 'blob' 
//   })
//   .then(res => {
//     const blob = new Blob([res.data]);
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;

//     const filename = res.headers['content-disposition']?.split('filename=')[1] || 'downloaded-file';
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//     showPopup('Файл успішно завантажено!', 'success');
//   })
//   .catch(err => {
//     console.error(err);
//     showPopup('Помилка: ' + (err.response?.data?.error || 'Файл не знайдено'), 'error');
//   });
// });

  
//   $('#file').change(function() {
//     if (this.files[0]) {
//       const fileName = this.files[0].name;
//       $(this).addClass('file-selected');
//       $('#currentCode')
//         .text('Вибраний файл: ' + fileName)
//         .css('animation', 'fileSelected 1s');
      
     
//       $('#upload').prop('disabled', false)
//         .removeClass('button-disabled')
//         .html('Upload')
//         .css('opacity', '1');
      
      
//       currentUploadedFile = null;
//     }
//   });

// });


$(document).ready(function() {

  let currentUploadedFile = null;


  function showPopup(message, type = 'info') {
    const popup = $('#forest-popup');
    const popupMessage = $('.forest-popup-message');
    const popupIcon = $('.forest-popup-icon i');


    popupMessage.text(message);


    if (type === 'error') {
      popup.addClass('forest-popup-error');
      popupIcon.removeClass('fa-leaf fa-check').addClass('fa-exclamation-circle');
    } else if (type === 'success') {
      popup.addClass('forest-popup-success');
      popupIcon.removeClass('fa-leaf fa-exclamation-circle').addClass('fa-check');
    } else {
      popup.removeClass('forest-popup-error forest-popup-success');
      popupIcon.removeClass('fa-check fa-exclamation-circle').addClass('fa-leaf');
    }


    popup.addClass('forest-popup-show');

    setTimeout(() => {
      popup.removeClass('forest-popup-show');
    }, 3000);
  }

  $('#upload').click(function() {
    const fileInput = $('#file')[0];
    const selectedFile = fileInput.files[0];

    if (!selectedFile) {
      showPopup('Будь ласка, виберіть файл!', 'error');
      return;
    }


    if (currentUploadedFile &&
        currentUploadedFile.name === selectedFile.name &&
        currentUploadedFile.size === selectedFile.size &&
        currentUploadedFile.lastModified === selectedFile.lastModified) {
      showPopup('Цей файл вже було завантажено. Виберіть інший файл.', );
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);


    axios.post('http://localhost:10000/upload', formData, {
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


      currentUploadedFile = selectedFile;


      $('#upload').prop('disabled', true).addClass('button-disabled')
        .html('Файл завантажено <i class="fas fa-check"></i>');

      showPopup('Файл успішно завантажено!', 'success');
    })
    .catch(err => {
      console.error(err);
      $('#currentCode')
        .text('Помилка: ' + ( 'Щось пішло не так'))
        .css('color', '#ffaaaa')
        .css('animation', 'codeError 2s infinite alternate');




      showPopup('Помилка: ' + ('Щось пішло не так'), 'error');
    });
  });

  $('#download').click(function() {
    const code = $('#downloadCode').val();
  
    if (!code) {
      showPopup('Будь ласка, введіть код!', 'error');
      return;
    }
  
    axios.get(`http://localhost:10000/download/${code}`, {
      responseType: 'blob'
    })
    .then(res => {
      
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      
     
      const disposition = res.headers['content-disposition'];
      const filename = disposition ? 
        disposition.split('filename=')[1].replace(/["']/g, '') : 
        'downloaded-file';
  
     
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
     
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      showPopup('Файл успішно завантажено!', 'success');
    })
    .catch(err => {
      console.error(err);
      showPopup('Помилка: ' + (err.response?.data?.error || 'Файл не знайдено'), 'error');
    });
  });


  $('#file').change(function() {
    if (this.files[0]) {
      const fileName = this.files[0].name;
      $(this).addClass('file-selected');
      $('#currentCode')
        .text('Вибраний файл: ' + fileName)
        .css('animation', 'fileSelected 1s');


      $('#upload').prop('disabled', false)
        .removeClass('button-disabled')
        .html('Upload')
        .css('opacity', '1');


      currentUploadedFile = null;
    }
  });

});
