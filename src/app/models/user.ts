export class User{
	constructor(
		public id: number,
		public name: string,
		public surname: string,
		public role:string,
		public email: string,
		public passord: string,
		public description: string
	){}
}