import spreadAttributes from "../js/spreadAttributes.js";
import "../components/bp-stack.js";

class H1 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
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
              font-weight: 400;
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

class H3 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
            h3 {
                margin: 0;
                font-size: 20px;
                font-weight: 400;
                line-height: 1.2;
                font-family: "Space Mono", sans-serif;
            } 

            hr {
                display: inline-block;
                width: 100%;
                max-width: 200px;
                border-bottom: 1px solid;
                margin: 0;
            }
        `;

    shadowRoot.innerHTML = `
                <style>${styles}</style>
                <bp-stack gap-size="4px">
                    <h3 ${spreadAttributes(this.attributes)}><slot></slot></h3>
                    <hr />
                </bp-stack>
            `;
  }
}

customElements.define("bp-heading3", H3);

class H4 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
              h4 {
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  line-height: 1.2;
                  font-family: "Open Sans", sans-serif;
              } 
          `;

    shadowRoot.innerHTML = `
                  <style>${styles}</style>
                  <h4 ${spreadAttributes(this.attributes)}><slot></slot></h4>
              `;
  }
}

customElements.define("bp-heading4", H4);
