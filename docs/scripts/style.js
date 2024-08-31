class CustomInt extends HTMLElement {
    constructor() {
        super();
        this.innerText = "int";  // 设置默认显示文本
        this.className = "int";  // 应用相应的CSS类
    }
}

class CustomConstexpr extends HTMLElement {
    constructor() {
        super();
        this.innerText = "constexpr";  // 设置默认显示文本
        this.className = "constexpr";  // 应用相应的CSS类
    }
}

// void
class CustomVoid extends HTMLElement {
    constructor() {
        super();
        this.innerText = "void";  // 设置默认显示文本
        this.className = "void";  // 应用相应的CSS类
    }
}

class CustomDefault extends HTMLElement {
    constructor() {
        super();
        this.className = "default";  // 应用相应的CSS类
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
customElements.define('t-constexpr', CustomConstexpr);
customElements.define('t-void', CustomVoid);
customElements.define('t-default', CustomDefault);

 