import { Options, Vue } from "vue-class-component";
import Dashboard from "./dashboard/dashboard.vue";
import Table from "./table/table.vue";

@Options({
    components: {
        Dashboard,
        Table,
    },
})
export default class Painel extends Vue { }