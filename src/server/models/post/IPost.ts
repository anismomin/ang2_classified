interface IPost {
	user_id: string;
	title: string;
	price: number;
	category: string;
	description: string;
	images: any[];
	name: string;
	phone: number;
	state: string;
	city: string;
	status: boolean;
	cerate_at: Date;
}

export default IPost;