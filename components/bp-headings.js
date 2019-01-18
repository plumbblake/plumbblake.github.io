import spreadAttributes from "../js/spreadAttributes.js";

class H1 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        h1 {
            margin: 0;
            font-size: 32px;
            line-height: 1.2;
            font-family: "Space Mono", sans-serif;
        } 
        
        @media (min-width: 600px){
            h1 {
                font-size: 42px;
            }
        }
        
        :host([center]) {
            text-align: center;
        }
    `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <h1 ${spreadAttributes(this.attributes)}><slot></slot></h1>
        `;
  }
}

customElements.define("bp-heading1", H1);

class H2 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
          h2 {
              margin: 0;
              font-size: 28px;
              font-weight: 300;
              line-height: 1.2;
              font-family: "Space Mono", sans-serif;
          } 
          
          @media (min-width: 600px){
              h2 {
                  font-size: 30px;
              }
          }
          
          :host([center]) {
              text-align: center;
          }
      `;

    shadowRoot.innerHTML = `
              <style>${styles}</style>
              <h2 ${spreadAttributes(this.attributes)}><slot></slot></h2>
          `;
  }
}

customElements.define("bp-heading2", H2);
