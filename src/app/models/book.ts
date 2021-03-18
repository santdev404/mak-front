export class Book{
	constructor(
		public id: number,
		public user_id: number,
		public category_id: number,
		public name: string,
		public publication_date: any,
		public author: string,
        public borrow: string,
        public borrow_user_id: string,
        public content: string,
		public createdAt: any
	){}
}