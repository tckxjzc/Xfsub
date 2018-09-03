import {
    NativeModules
} from 'react-native';

interface HTMLParseNativeModule{
    parseLists(html:string,callback:Function);
    parseDetails(html:string,callback:Function);
    parseMaxPage(html:string,callback:Function);
}

let HTMLParse:HTMLParseNativeModule=NativeModules.HTMLParse;

export default HTMLParse;