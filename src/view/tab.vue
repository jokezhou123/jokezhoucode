<template>
    <div>
        <el-tabs
            v-model="activeIndex"
            type="card"
            @tab-click="clickTab"
            @tab-remove="removeTab"
            closable
        >
        <!-- v-if可用v-show代替，也可考虑使用计算属性代替v-for与v-if功能 -->
            <el-tab-pane
                v-for="item of openTab"
                v-show="openTab.length"
                :key="item.name"
                :label="item.name"
                :name="item.route"
            >
            </el-tab-pane>
        </el-tabs>
        <keep-alive>
            <router-view />
        </keep-alive>    
    </div>
</template>

<script>
export default {
    data(){
        return {
            openTab:[],
            activeIndex:''
        }
    },
    methods:{
        set_active_index(index){
            this.activeIndex = index
        },
        add_tabs(data){
            this.openTab.push(data)
        },
        delete_tabs(route){
            let index = 0
            for(let gohh of this.openTab){
                if(gohh.route == route){
                break
                }
                index++
            }
            this.openTab.splice(index,1)
        },
        clickTab() {
            this.$router.push({path: this.activeIndex})
            console.log(this.$route.path)
        },
        removeTab (target) {
            if(target == '/page1'){
                return
            }
            this.delete_tabs(target)
            if (this.activeIndex === target) {
                if (this.openTab && this.openTab.length >= 1) {
                    console.log('=============', this.openTab[this.openTab.length - 1].route)
                    this.set_active_index(this.openTab[this.openTab.length - 1].route)
                    this.$router.push({path: this.activeIndex})
                }
            }
        }
    },
    watch: {
        '$route' (to, from) {
            console.log('跳转了')
            let flag = false
            for (let item of this.openTab) {
                if (item.name === to.name) {
                    this.set_active_index(to.path)
                    flag = true
                    break
                }
            }
            if (!flag) {
                this.add_tabs({route: to.path, name: to.name})
                this.set_active_index(to.path)
            }
        }
    },
    mounted () {
        console.log('mounted')
        console.log('mounted1',this.openTab)
        if(this.openTab.length>=1){
        }else{
            if(this.$route.path !== '/dashboard') {
                console.log('mounted222222',this.openTab)
                this.add_tabs({route: '/dashboard' , name: '首页111'})
                this.add_tabs({route: this.$route.path , name: this.$route.name })
                this.set_active_index(this.$route.path)
            }else{
                this.add_tabs({route: '/dashboard', name: '首页'})
                this.set_active_index('/dashboard')
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .el-tabs__nav .el-tabs__item:nth-child(1) span{
        display: none;
    }
</style>