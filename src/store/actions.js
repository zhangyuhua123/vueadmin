let actions = {
    checkeaccount({commit},obj){
        if(!obj.value){
            obj.cb(new Error('账户不能为空'))
        }
        commit('dd')
    }
}