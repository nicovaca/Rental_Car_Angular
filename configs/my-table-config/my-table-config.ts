import { MyAction } from "../configClass/my-action";
import { MyHeaders } from "../configClass/my-headers";
import { MyOrder } from "../configClass/my-order";
import { MyPagination } from "../configClass/my-pagination";
import { MySearch } from "../configClass/my-search";




export class MyTableConfig {
  headers! : MyHeaders[] ;
  order! : MyOrder ;
  search! : MySearch ;
  pagination! : MyPagination ;
  actions! : MyAction [];
}
