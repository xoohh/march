type ID = string|number

type AccountInfo = {
  access_token:string
  user:{}
}

interface Group {
  id:string
  name:string
  selected:boolean
  users:Record<Member, string>
}

type Member = {
  id:string
  email:string
  selected:boolean
}