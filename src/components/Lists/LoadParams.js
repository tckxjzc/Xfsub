import data from '../../data';
export var TYPE;
(function (TYPE) {
    TYPE[TYPE["SEARCH"] = 0] = "SEARCH";
    TYPE[TYPE["SORT"] = 1] = "SORT";
})(TYPE || (TYPE = {}));
class LoadParams {
    constructor(args) {
        this.category = 1;
        this.page = 1;
        this.type = TYPE.SORT;
        if (args) {
            this.category = args.category || this.category;
        }
    }
    getUrl() {
        if (this.type === TYPE.SEARCH) {
            return `${data.baseUrl}search.php?keyword=${this.keyword}&page=${this.page}`;
        }
        else {
            return `${data.baseUrl}sort-${this.category}-${this.page}.html`;
        }
    }
}
export default LoadParams;
