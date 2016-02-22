interface IPostingImages {
	path: string;
}

interface IPosting {
	user_id: string,
	title: string;
	price: number;
	category: string;
	description: string;
	images: IPostingImages[];
	name: string;
	phone: number;
	state: string;
	city: string;
	status: boolean;
}

export default IPosting;