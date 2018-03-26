
import Vue from 'vue';

class Dialog {
    constructor() {
        removeCommnetNodes();
     }

    static get supportTypes() {
        return Object.keys(DialogSupportTypeEnum);
    }

    static show(options) {

        let { url, title, style, width, parent, component, data, htmlText, template = '', type = 'object' } = options;

        if (!DialogSupportTypeEnum[type]) throw new Error('The dialog component does not support type ' + type);

        if (type == 'object' && typeof component == 'object')
            template = `<div class="w680" v-if="show">
                            <el-dialog :style="style" :title="title" :visible.sync="show" :close-on-click-modal="false" :width="width" :before-close="beforeClose">
                                <child v-on:click="click" :data="data"></child>
                            </el-dialog>
                        </div>`;
        else if (type == 'html' && typeof component == 'string')
            template = `<div class="w680" v-if="show">
                            <el-dialog :title="title" :visible.sync="show" :close-on-click-modal="false" :width="width"  >${component}</el-dialog>
                        </div>`;
        else if (type == 'componenttag' && typeof component == 'string')
            template = `<div class="w680" v-if="show">
                            <el-dialog :title="title" :visible.sync="show" :close-on-click-modal="false" :width="width" >
                                <${component} v-on:callback="callback" :init_data="data"></${component}>
                            </el-dialog>
                        </div>`;
        else if (type == 'iframe' && !!url)
            template = `<div class="w680 dialog-h400" v-if="show">
                            <el-dialog  :title="title" :visible.sync="show" :close-on-click-modal="false" :width="width" >
                                <iframe :src="url" style="width:100%;height:100%;"></iframe>
                            </el-dialog>
                        </div>`;
        else
            throw new Error('Component content definition error.');

        let dialog = new Vue({
            el: document.createElement('div'),
            data: () => ({
                url: url,
                title: title,
                style: style,
                width: width || '50%',
                modal: true,
                custom_class: 'dialg-class',
                close_on_press_escape: false,
                show_close: true,
                show: true,
                data: data,
                resolve: e => { },
                reject: e => { }
            }),
            template: template,
            mounted: () => { },
            methods: {
                beforeClose(done) {
                    this.resolve({ type: 'beforeClose' });
                    removeCommnetNodes();
                    done();
                },
                click({ type, data }) {
                    if (!type || type == 'close' || type == 'cancel')
                        this.show = false;
    
                    this.resolve({ type: type, close: this.close });
                },
            },
            components: {
                child: component,
            }
        });

        document.body.appendChild(dialog.$el);

        return new Promise((resolve, reject) => {
            dialog.resolve = resolve;
            dialog.reject = reject;
        });
    }
}

let removeCommnetNodes=function(){
    setTimeout(function(){
        document.body.childNodes.forEach(node=>{
            if(node.nodeType == 8)
                node.parentElement.removeChild(node);
        });
    },1000);
}

let DialogSupportTypeEnum = {
    'object': 1, 'html': 2, 'componenttag': 3, 'iframe': 4
};

export default {
    install(Vue) {
        Vue.prototype.dialog = Dialog;
    }
};