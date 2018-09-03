import data from '../../data';
export enum TYPE {
    SEARCH,
    SORT
}


class LoadParams{
    category:number|string=1;
    page=1;
    type=TYPE.SORT;
    keyword;
    constructor(args?){
        if(args){
            this.category=args.category||this.category;
        }
    }
    getUrl(){
        if(this.type===TYPE.SEARCH){
            return `${data.baseUrl}search.php?keyword=${this.keyword}&page=${this.page}`;
        }else{
            return `${data.baseUrl}sort-${this.category}-${this.page}.html`;
        }
    }
}



export default LoadParams;