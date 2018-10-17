const cloudinary = require("../../cloudinary");

module.exports = (req, info) => {
	const cursor = info.params.cursor;

	if (cursor) {
		console.log("!!!!!!!!!!!! RECEIVED NEXT CURSOR - ", cursor);
	}

	return cloudinary.search({
		cursor,
		tags: ["reactnext"],
		max: 40,
	})
		.then((result) => {

			console.log("!!!!!!!!! returned from search - ", {
				...result,
				resources: "",
				items: result.resources.length,
			});

			return {
				response: {
					error: !!result.error,
					photos: result.error ? [] : result.resources.map((p) => ({
						...p,
						price: (Math.ceil(Math.random() * 10) + Math.random()).toFixed(2),
					})),
					meta: {
						next: result.next_cursor,
						count: result.total_count,
						limit: result.rate_limit_allowed,
						limitReset: result.rate_limit_reset_at,
						remaining: result.rate_limit_remaining,
					},
				}
			}
		});
};
