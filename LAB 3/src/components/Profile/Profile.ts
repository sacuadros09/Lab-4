    import styles from "./Profile.css"

    export enum Attribute {
        "uid" = "uid",
        "url" = "url",
        "name" = "name",
        "status" = "status",
        "species" = "species",
        "gender"= "gender"
    } 

    class Profile extends HTMLElement {
        uid?: number;
        url?: string;
        name?: string;
        status?: string;
        species?: string;
        gender?: string;
        

        static get observedAttributes() {
            const attrs: Record<Attribute, null> = {
                uid: null,
                url:null,
                name: null,
                status: null,
                species: null,
                gender: null
            };
            return Object.keys(attrs);
        }

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
            this.render();
        }




        attributeChangedCallback(
            propName: Attribute,
            _: string | undefined,
            newValue: string | undefined
            ) {
                switch (propName) {
                    case Attribute.uid:
                        this.uid = newValue ? Number (newValue):undefined;
                        break;

                    default:
                    this[propName] = newValue;
                    break;
                }

                this.render();
            }

            setupSearch(){
                const searchInput = this.shadowRoot?.querySelector(
                    "#searchInput"
                ) as HTMLInputElement;
                const searchButton= this.shadowRoot?.querySelector(
                    "#searchButton"
                ) as HTMLButtonElement

                searchButton.addEventListener("click",()=>{
                    const searchTerm = searchInput.value
                    this.dispatchEvent(new CustomEvent("search",{detail:searchTerm}))
                })

            }

            render() {
                if (this.shadowRoot) {
                    this.shadowRoot.innerHTML = ``

                    const css = this.ownerDocument.createElement("style");
                    css.innerHTML = styles;
                    this.shadowRoot?.appendChild(css);

                    this.shadowRoot.innerHTML += `
                    <section class = morty>
                    <h1>${this.uid}</h1>
                    <img src="${this.url}">
                    <h1>${this.name}</h1>
                    <h1>${this.status}</h1>
                    <h1>${this.species}</h1>
                    <h1>${this.gender}</h1>
            
                    </section>
                    `;

                    
                
                }
            }
        }

    customElements.define("my-profile", Profile);
    export default Profile;