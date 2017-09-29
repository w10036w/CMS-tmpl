// public
const UserPublic = {
  _id: {},
  username: {},
  email: {},
  displayName: {},
  role: {},
  createAt: {},
}
// admin
const UserFindOne = {
  _id: { has: true },
  username: { has: true },
  email: { has: true },
  displayName: { has: true },
  role: { has: true },
  createAt: { has: true },
  updateAt: { has: true },
  hidden: { has: true },
  bio: {},
}
const UserCreate = {
  username: { value: "editor12", type: 'string', unique: true },
  displayName: { value: "editor Display-Name", type: 'string' },
  email: { value: 'editor@arknodejs.com', unique: true },
  avatar: { value: "https://avatars.githubusercontent.com/u/3350260?v=3", type: "string" },
  role: { value: 'editor', type: 'string' },
  bio: { value: "a good hacker", type: 'string' }
}

module.exports = {
  UserPublic,
  UserFindOne,
  UserCreate
}