interface Account {
  avatar_url:string
  // bot_id:null
  department_count:number
  display_department:string
  display_name:string
  display_position:null
  display_responsibility:string
  id:number
  is_bot:boolean
  name:string
  nickname:string
  role_type:"normal"|string
  space_id:number
  status:"activated"|string
  vacation_end_time:null
  vacation_start_time:null
  work_end_time:null
  work_start_time:null
}

interface SearchSuggest {
  collections:any[]
  keyword:string
}

interface SearchResult {
  display?:{}
  type:"user"|string
  id:number
  email:string
  image_url:string
  space_id:number
  status:"activated"|string
  subtitle:string
  title:string
}