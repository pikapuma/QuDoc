class CustomInt extends HTMLElement {
    constructor() {
        super();
        this.className = "int tag-shared-style";  // 应用相应的CSS类
    }

    connectedCallback() {
        // 确保slot更改时更新组件
        // 如果组件内部直接使用内容而不是shadow DOM则不需要
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `<slot></slot>`;
        }
    }
}

class Customtype extends HTMLElement {
    constructor() {
        super();
        this.className = "type tag-shared-style";  // 应用相应的CSS类
    }

    connectedCallback() {
        // 确保slot更改时更新组件
        // 如果组件内部直接使用内容而不是shadow DOM则不需要
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `<slot></slot>`;
        }
    }
}

// void
class CustomVoid extends HTMLElement {
    constructor() {
        super();
        this.innerText = "void";  // 设置默认显示文本
        this.className = "void tag-shared-style";  // 应用相应的CSS类
    }
}

// double
class CustomDouble extends HTMLElement {
    constructor() {
        super();
        this.className = "double tag-shared-style";  // 应用相应的CSS类
    }

    connectedCallback() {
        // 确保slot更改时更新组件
        // 如果组件内部直接使用内容而不是shadow DOM则不需要
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `<slot></slot>`;
        }
    }
}

// Qu
class CustomQu extends HTMLElement {
    constructor() {
        super();
        this.className = "Qu tag-shared-style";  // 应用相应的CSS类
    }

    connectedCallback() {
        // 确保slot更改时更新组件
        // 如果组件内部直接使用内容而不是shadow DOM则不需要
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `<slot></slot>`;
        }
    }
}

class CustomDefault extends HTMLElement {
    constructor() {
        super();
        this.className = "default tag-shared-style";  // 应用相应的CSS类
    }

    connectedCallback() {
        // 确保slot更改时更新组件
        // 如果组件内部直接使用内容而不是shadow DOM则不需要
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `<slot></slot>`;
        }
    }
}




customElements.define('t-int', CustomInt);
customElements.define('t-type', Customtype);
customElements.define('t-void', CustomVoid);
customElements.define('t-double', CustomDouble);
customElements.define('t-qu', CustomQu);
customElements.define('t-default', CustomDefault);

 