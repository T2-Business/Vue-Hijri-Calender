declare module 'vue-popperjs' {
    import { Vue } from 'vue-property-decorator';
    interface PopperType extends Vue {
        doClose(): void;
    }
}
declare module 'moment-hijri';