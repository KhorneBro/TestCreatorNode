export interface User {
  email: string,
  password: string
}

export interface AllUsers {
  _id?: string,
  email: string,
  name: string,
  password: string,
  telegram?: string,
  status: string,
}
