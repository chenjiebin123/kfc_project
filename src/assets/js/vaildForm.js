import {Notify} from 'vant'
class VaildForm {
    vaild(obj){
        for(var key in obj){
            if(!obj[key].reg.test(obj[key].value)){
                Notify({
                    message: obj[key].errMsg,
                    color:'#fff',
                    background: '#ff3b3b',
                    });
                    
                return false;
            }
        }
        return true;
    }
    
}
export const vaildForm = new VaildForm()