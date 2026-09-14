import { useState } from "react"; import { Pagination } from "./Pagination"
export default { title:"数据展示 / Pagination",component:Pagination }
export const Default={render:()=>{const [page,setPage]=useState(2);return <Pagination onPageChange={setPage} page={page} pageCount={5}/>}}
export const Disabled={args:{page:2,pageCount:5,disabled:true,onPageChange:()=>undefined}}
