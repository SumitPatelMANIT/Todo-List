let input = document.querySelector('.input');
let addButton = document.querySelector('.button');
let section2 = document.querySelector('.section2');

let API = `https://69cd52b4ddc3cabb7bd283a7.mockapi.io/api/v1/todos`;

addButton.addEventListener('click',postData)

async function fetchData(){
       let response = await fetch(API);
       let data = await response.json()
        
       if(data){
          section2.innerHTML='';
           data.forEach(element => {
        let div = document.createElement('div');        
         div.className = 'card';
         div.innerHTML = `
         <div class="inputTask"> ${element.text} </div>
          <input class="editInput" type="text" placeholder=" Write some task..." value = '${element.text}'>
                       <div class="taskbtn">
                         <button class ='deleteBtn'>Delete</button>        
                       <button class = 'editBtn'>Edit</button>
                       <button class = 'saveBtn'>Save</button>
                       
                       </div> 
         `

          let deleteBtn = div.querySelector('.deleteBtn');
          let editBtn = div.querySelector('.editBtn');
          let saveBtn = div.querySelector('.saveBtn');
          let paraText = div.querySelector('.inputTask');
          let editInput = div.querySelector('.editInput');

          deleteBtn.addEventListener('click',()=>{
             deleteData(element.id);
          })


          editBtn.addEventListener('click',()=>{
               editBtn.style.display = 'none';
               saveBtn.style.display = 'inline';
               paraText.style.display = 'none';
               editInput.style.display = 'inline';
               
            })
            saveBtn.addEventListener('click',async ()=>{
                let val = editInput.value;
               let response =  await updateData(element.id, val);
               if(response.status === 200){
                fetchData();
                saveBtn.style.display = 'none';
                editBtn.style.display = 'inline';
                paraText.style.display = 'inline';
                editInput.style.display = 'none';
            }
          })

            section2.append(div);

            });      
       }
           
          
     
}


 async function postData(){
        
       let value = input.value.trim();
       console.log(value);
         
        if(value !== ''){
                  let objData = {
             text: value.trim(),
        }

        let response = await fetch(API, {
            method: 'POST',
            headers:{
                'Content-Type' :'application/json',
            },
            body: JSON.stringify(objData),

 });
        }

 
        input.value = '';
        fetchData();
      
 }

 async function deleteData(id){
              let response = await fetch(`${API}/${id}`, {
                 method: 'DELETE',
              });
              console.log(response);
              fetchData();
 }

 async function updateData(id, val){
        
      

        let objData = {
             text: val.trim(),
        }

        let response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type' :'application/json',
            },
            body: JSON.stringify(objData),

 });
      return response;
}


fetchData();