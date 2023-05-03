const App = {
    data () {
        return {
            title: 'Notes',
            input: {
                value: '',
                placeholder: 'Type your note'
            },
            notes: [],
            editIndex: null
        }
    },
    methods: {
        onSubmit(){
            console.log(this.input);
            this.notes.push(this.input.value);
            this.input.value = '';
        },
        deleteitem(ind){
            this.notes.splice(ind, 1);
        },
        saveLocal(){
            const parsed = JSON.stringify(this.notes);
            localStorage.setItem('notes', parsed)
        },
        getNotes(){
            const localNotes = localStorage.getItem('notes');
            if(localNotes){
                this.notes = JSON.parse(localNotes)
            }
        },
        editItem(item, ind){
            this.input.value = item;
            this.editIndex = ind;
        },
        saveItemEdit(){
            this.notes = this.notes.map((el, index)=> index == this.editIndex ? this.input.value : el);
            this.input.value = '';
        }
    },
    watch: {
        notes: {
            handler(){
                this.saveLocal();
            },deep: true
        }
    },
    mounted(){
        this.getNotes()
    }
}

Vue.createApp(App).mount('#app')