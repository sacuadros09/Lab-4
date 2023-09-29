    import { api } from "./data";
    import "./components/index"
    import Profile, { Attribute } from "./components/Profile/Profile";

    class AppContainer extends HTMLElement {
        mortys: Profile[] = [];
        
        constructor() {
            super();
            this.attachShadow({ mode: "open" });   
        }
        
        async connectedCallback() {
            
            const data = await api()
            console.log(api)
            
            data?.forEach((user:any) => {
                const mortyCard = this.ownerDocument.createElement(
                    "my-profile"
                    ) as Profile;
                    mortyCard .setAttribute(Attribute.uid, user.id);
                    mortyCard .setAttribute(Attribute.url, user.image);
                    mortyCard .setAttribute(Attribute.name, user.name); 
                    mortyCard .setAttribute(Attribute.status, user.status);
                    mortyCard .setAttribute(Attribute.species, user.species);
                    mortyCard .setAttribute(Attribute.gender, user.gender);
                    
                    
                    this.mortys.push(mortyCard );
                });
                
                this.render(this.mortys);
            }
            
            render(mortys:any){
                
                if (this.shadowRoot) {
                    this.shadowRoot.innerHTML = ``;
                    
                    this.mortys.forEach((morty) => {
                        this.shadowRoot?.appendChild(morty); 

                  
 
                    });
                    
                    const newsec = this.ownerDocument?.createElement("section");
                    const title = this.ownerDocument.createElement("h1")
                    title.innerText = "Busquedas"
                    newsec.appendChild(title)
                    this.shadowRoot?.appendChild(newsec)

                                        const container = this.ownerDocument.createElement("section")



                    const input = this.ownerDocument.createElement("input");
                    input.placeholder = "Name";
                    container.appendChild(input)

                    const button = this.ownerDocument.createElement("button");
                    button.innerText = "Buscar"
                    button.id = "serchInput"
                    button.addEventListener('click',function() 
                     { buscarPornombre
                        console.log('Funciona????')
                    })
                    container.appendChild(button)
                    this.shadowRoot?.appendChild(container)


                    function buscarPornombre (){
                        const searchInput = document.getElementById('serchInput')?.ariaValueMax?.toUpperCase();

                        for (let i = 0; i < mortys.lengtht; i++) {
                            const elemento  = mortys [i];
                            const nombre = elemento.textContent.toUpperCase();

                            if (nombre.includes(searchInput)) {
                                elemento.style.display='block'
                                elemento.push(newsec)
    
                            }else{
                                elemento.style.display = 'none'
                                console.log('')
                            }
                        } 

                       
                        
                    }
                }
            }
        }
        
        customElements.define("app-container", AppContainer);