class Hero extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });

        const styles = `:host {
            margin: 0 auto;
            max-width: 940px;
            max-height: 500px;
            height: 100vw;
            display: block;
            background: bottom center / contain no-repeat url("./img/world.jpg") #000;
            color: white;
            font-weight: 400;
            font-size: 50px;
        }
        
        #text {
            display: flex;
            justify-content: center;
        }`

        shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div id="text">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define("bp-hero", Hero);