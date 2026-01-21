import { query } from "./_generated/server";

export const sayHi = query({
	args: {},
	handler: async () => {
		return "hi";
	},
});
