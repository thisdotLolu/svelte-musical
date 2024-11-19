import tippy, { hideOnEsc, hideOnPopperBlur, hideOthersOnOpen, type ExtendedProps } from './tippy-plugins';
import 'tippy.js/dist/tippy.css'

export default function(node:HTMLElement, options:Partial<ExtendedProps>){
    const plugins = [hideOnEsc,hideOnPopperBlur,hideOthersOnOpen];
    const _options = options? {...options, plugins} : {plugins}
    const instance = tippy(node, _options);
    return{
        update(newOptions:ExtendedProps){
            const _newOptions = newOptions ? {...newOptions, plugins}:{plugins}
            instance.setProps(_newOptions);
        },
        destroy(){
            instance.destroy();
        }
    }
}