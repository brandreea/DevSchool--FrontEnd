const main={
    users: [],
    error:'',
    async init(){
        console.log("Init is fine");
        const users= await this.fetchUsers();
        if(users)
        {
            this.users=users;
        }
        else{
            this.error="An arror has occured";
        }
        console.log(this.users);
        this.render();
        
    },
    async fetchUsers(){
        const response= await fetch('https://jsonplaceholder.typicode.com/users');
        if(response.ok)
        {
            const data =  await response.json();
            return data;
        }
        return null;
    },
   render(){
       
        if(this.error){
            document.getElementById('error').textContent=this.error;
        }else{
            console.log("got here");
            const items= this.users.map(user=> `<li>${user.name} ${user.email}</li>`)
            //console.log(items);
            const list = document.getElementById('list');
            list.innerHTML = items.join(' ');
            }
        
    },
}
//main.init();